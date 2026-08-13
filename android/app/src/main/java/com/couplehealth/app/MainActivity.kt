package com.couplehealth.app

import android.content.ContentValues
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.view.View
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.couplehealth.app.bridge.BridgeHost
import com.couplehealth.app.bridge.NativeBridge
import com.couplehealth.app.util.PermissionHelper
import com.couplehealth.app.util.SystemBars
import com.couplehealth.app.web.FileChooserHelper
import com.couplehealth.app.web.HealthWebChromeClient
import com.couplehealth.app.web.HealthWebViewClient
import java.io.File
import java.io.FileOutputStream

class MainActivity : AppCompatActivity(), BridgeHost {

    private lateinit var webView: WebView
    private lateinit var loadingOverlay: View
    private lateinit var errorPage: View

    private lateinit var nativeBridge: NativeBridge
    private lateinit var fileChooserHelper: FileChooserHelper

    private val trustedHost: String by lazy {
        runCatching { Uri.parse(com.couplehealth.app.BuildConfig.WEB_APP_URL).host ?: "" }
            .getOrDefault("")
    }

    private var permissionPrompted = false
    private var pageReady = false

    // ---- Launchers (registered before STARTED) ----
    private val cameraPermLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            fileChooserHelper.proceedAfterCameraPermission(granted)
        }

    private val micPermLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            if (!granted) toast(getString(R.string.permission_denied))
        }

    private val firstTouchPermLauncher =
        registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { _ ->
            /* result ignored; user may still trigger features which re-prompt */
        }

    private val chooserLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            fileChooserHelper.handleResult(result.resultCode, result.data)
        }

    private val backCallback = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            // 1) close web modal/sheet/picker first; 2) WebView history; 3) exit (req 14).
            webView.evaluateJavascript(
                "(window.__nativeBack&&window.__nativeBack())||'none'"
            ) { result ->
                val r = (result ?: "none").trim().trim('"')
                if (r == "closed") return@evaluateJavascript
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // True Edge-to-Edge: transparent system bars, content draws behind them.
        // Icon appearance is controlled at runtime by SystemBars to follow the web theme.
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        loadingOverlay = findViewById(R.id.loadingOverlay)
        errorPage = findViewById(R.id.errorPage)
        findViewById<android.widget.Button>(R.id.btnReload).setOnClickListener {
            errorPage.visibility = View.GONE
            loadingOverlay.visibility = View.VISIBLE
            webView.reload()
        }

        nativeBridge = NativeBridge(this)
        fileChooserHelper = FileChooserHelper(this, cameraPermLauncher, chooserLauncher)

        // Capture real system insets (statusBars + displayCutout + navigationBars) during
        // layout and push them to the web page as CSS variables. This is the reliable path
        // because env(safe-area-inset-*) may return 0 in some WebView versions. (req 4/5)
        setupInsetListener()

        setupWebView()
        SystemBars.applyTheme(this, "dark") // initial; web app will correct it after load

        onBackPressedDispatcher.addCallback(this, backCallback)

        loadUrl()
    }

    private fun setupWebView() {
        webView.apply {
            setBackgroundColor(0xFF08080C.toInt()) // dark, no white flash
            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            addJavascriptInterface(nativeBridge, "AndroidBridge")

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true          // localStorage MUST persist (req 6)
                databaseEnabled = true
                allowFileAccess = true
                allowContentAccess = true
                val isFile = com.couplehealth.app.BuildConfig.WEB_APP_URL.startsWith("file://")
                if (isFile) {
                    // Bundled debug build: let the page call dashscope/supabase cross-origin
                    // (our own bundled content only).
                    allowFileAccessFromFileURLs = true
                    allowUniversalAccessFromFileURLs = true
                }
                mediaPlaybackRequiresUserGesture = false
                cacheMode = WebSettings.LOAD_DEFAULT // keep cache; NEVER clear
                builtInZoomControls = false          // mobile app, no zoom UI (req 21)
                displayZoomControls = false
                setSupportZoom(false)
                loadWithOverviewMode = true
                useWideViewPort = true
                javaScriptCanOpenWindowsAutomatically = true
                setGeolocationEnabled(false)
            }

            // Debug builds: enable Chrome inspector; Release: must be off (req 37).
            WebView.setWebContentsDebuggingEnabled(
                com.couplehealth.app.BuildConfig.WEB_DEBUG_ENABLED
            )

            webChromeClient = HealthWebChromeClient(
                activity = this@MainActivity,
                fileChooserHelper = fileChooserHelper,
                onMicNeeded = {
                    if (!PermissionHelper.hasMic(this@MainActivity)) micPermLauncher.launch(android.Manifest.permission.RECORD_AUDIO)
                }
            )
            webViewClient = HealthWebViewClient(
                trustedHost = trustedHost,
                onPageCommit = { runOnUiThread { hideLoading(); pushSafeAreaToWeb() } },
                onError = { runOnUiThread { showError() } },
                onRebind = { runOnUiThread { recreateWebContainer() } },
                onPageLoaded = {
                    runOnUiThread {
                        pushSafeAreaToWeb()
                        // Delayed re-push: handles race condition where page JS
                        // might reset CSS variables after initial injection
                        webView.postDelayed({ pushSafeAreaToWeb() }, 500)
                        webView.postDelayed({ pushSafeAreaToWeb() }, 1500)
                    }
                }
            )

            // Second-layer defense: suppress native long-press context menu on non-editable
            // areas. Web layer (user-select:none, touch-callout:none, contextmenu prevention)
            // is primary; this catches devices (MIUI/HyperOS) that ignore web CSS. (req 20)
            // Does NOT affect pointerdown/pointerup — voice "press and hold" still works.
            setOnLongClickListener {
                val type = webView.hitTestResult.type
                // true = consume (suppress menu) for non-editable areas.
                // false = allow paste/select for editable fields.
                type != WebView.HitTestResult.EDIT_TEXT_TYPE
            }
        }

        // Request CAMERA + RECORD_AUDIO once on first interaction (both are core features,
        // req 9/10/32). Lazy so the prompt is tied to actual app use, not cold launch.
        webView.setOnTouchListener { _, _ ->
            if (!permissionPrompted) {
                permissionPrompted = true
                if (!PermissionHelper.hasCameraAndMic(this)) {
                    firstTouchPermLauncher.launch(
                        arrayOf(
                            android.Manifest.permission.CAMERA,
                            android.Manifest.permission.RECORD_AUDIO
                        )
                    )
                }
            }
            false
        }
    }

    private fun loadUrl() {
        val url = com.couplehealth.app.BuildConfig.WEB_APP_URL
        loadingOverlay.visibility = View.VISIBLE
        errorPage.visibility = View.GONE
        webView.loadUrl(url)
    }

    private fun hideLoading() {
        if (loadingOverlay.visibility == View.VISIBLE) loadingOverlay.visibility = View.GONE
    }

    private fun showError() {
        hideLoading()
        errorPage.visibility = View.VISIBLE
    }

    private fun recreateWebContainer() {
        // Renderer gone: destroy and rebuild the WebView in place.
        runCatching {
            (webView.parent as? android.view.ViewGroup)?.removeView(webView)
            webView.destroy()
        }
        // Simplest reliable recovery: recreate the activity.
        recreate()
    }

    // ---- BridgeHost ----
    override fun onThemeChange(theme: String) {
        runOnUiThread { SystemBars.applyTheme(this, theme) }
    }

    override fun onReady() {
        pageReady = true
    }

    override fun saveFile(name: String, base64: String) {
        // Runs on a binder thread (no UI). Decode + write, then toast on UI.
        try {
            val data = Base64.decode(base64, Base64.DEFAULT)
            val mime = guessMime(name)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val values = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, name)
                    put(MediaStore.MediaColumns.MIME_TYPE, mime)
                    put(MediaStore.MediaColumns.RELATIVE_PATH, android.os.Environment.DIRECTORY_DOWNLOADS)
                }
                val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                uri?.let { contentResolver.openOutputStream(it)?.use { o -> o.write(data); o.flush() } }
            } else {
                val dir = getExternalFilesDir(android.os.Environment.DIRECTORY_DOWNLOADS)
                dir?.mkdirs()
                val file = File(dir, name)
                FileOutputStream(file).use { it.write(data); it.flush() }
            }
            runOnUiThread { toast("已导出: $name") }
        } catch (e: Exception) {
            runOnUiThread { toast("导出失败: ${e.message}") }
        }
    }

    private fun guessMime(name: String): String = when {
        name.endsWith(".json", true) -> "application/json"
        name.endsWith(".txt", true) -> "text/plain"
        name.endsWith(".png", true) -> "image/png"
        name.endsWith(".jpg", true) || name.endsWith(".jpeg", true) -> "image/jpeg"
        else -> "application/octet-stream"
    }

    private fun toast(msg: String) = Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()

    // ---- Safe-area insets for web (env() may return 0 in some WebViews) ----
    // Captured via setOnApplyWindowInsetsListener during layout, stored here so
    // NativeBridge.getSafeAreaTop() returns a reliable value from any thread.
    private var safeTopDp = 0
    private var safeBottomDp = 0

    private fun setupInsetListener() {
        val contentView = findViewById<android.view.View>(android.R.id.content)
        ViewCompat.setOnApplyWindowInsetsListener(contentView) { _, insets ->
            val statusBar = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            val cutout = insets.getInsets(WindowInsetsCompat.Type.displayCutout()).top
            val navBar = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom
            val density = resources.displayMetrics.density
            val pxTop = maxOf(statusBar, cutout)
            safeTopDp = if (density > 0f) (pxTop / density).toInt() else pxTop
            safeBottomDp = if (density > 0f) (navBar / density).toInt() else navBar
            android.util.Log.d("SafeArea", "statusBars.top=${statusBar}px cutout.top=${cutout}px navBar.bottom=${navBar}px density=$density -> safeTopDp=${safeTopDp} safeBottomDp=${safeBottomDp}")
            // Push to web immediately (page may already be loaded)
            pushSafeAreaToWeb()
            insets
        }
        // Explicitly request insets dispatch in case the first layout already happened.
        ViewCompat.requestApplyInsets(contentView)
    }

    /** Proactively inject --android-safe-top/bottom CSS variables into the web page.
     *  Also adds 'android-app' class to <html> for targeted CSS rules.
     *  This is the SOLE safe-area data source — web side only reads, never writes. */
    private fun pushSafeAreaToWeb() {
        val js = "try{" +
            "document.documentElement.classList.add('android-app');" +
            "document.documentElement.style.setProperty('--android-safe-top','${safeTopDp}px');" +
            "document.documentElement.style.setProperty('--android-safe-bottom','${safeBottomDp}px');" +
            "}catch(e){}"
        webView.evaluateJavascript(js, null)
    }

    override fun getSafeAreaTop(): Int = safeTopDp
    override fun getSafeAreaBottom(): Int = safeBottomDp

    // ---- Lifecycle ----
    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        // IMPORTANT (req 6): never clear cache/storage here. Only release the WebView instance.
        runCatching {
            (webView.parent as? android.view.ViewGroup)?.removeView(webView)
            webView.destroy()
        }
        super.onDestroy()
    }
}
