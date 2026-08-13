package com.couplehealth.app.web

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import androidx.activity.result.ActivityResultLauncher
import androidx.core.content.FileProvider
import com.couplehealth.app.util.PermissionHelper
import java.io.File

/**
 * Implements WebChromeClient.onShowFileChooser for the web app's inputs:
 *  - accept image, capture environment (拍照识别 / 头像)  -> camera + gallery chooser
 *  - accept .json (数据导入)                              -> generic file picker
 *  - any other                                            -> generic file picker
 *
 * Camera capture uses a FileProvider URI (never raw file colon slash slash), req 11.
 * Supports multi-select when the web requests it.
 */
class FileChooserHelper(
    private val activity: Activity,
    private val cameraPermLauncher: ActivityResultLauncher<String>,
    private val chooserLauncher: ActivityResultLauncher<Intent>
) {

    private var callback: ValueCallback<Array<Uri>>? = null
    private var cameraUri: Uri? = null
    private var pendingParams: WebChromeClient.FileChooserParams? = null

    fun open(cb: ValueCallback<Array<Uri>>, params: WebChromeClient.FileChooserParams): Boolean {
        // Cancel any previously pending picker (req: never leave the callback hanging).
        callback?.onReceiveValue(null)
        callback = cb
        pendingParams = params
        cameraUri = null

        if (offersCamera(params) && !PermissionHelper.hasCamera(activity)) {
            // Need CAMERA before we can include the camera option in the chooser.
            cameraPermLauncher.launch(android.Manifest.permission.CAMERA)
        } else {
            launchChooser(cameraAllowed = offersCamera(params) && PermissionHelper.hasCamera(activity))
        }
        return true
    }

    /** Called after the CAMERA permission request resolves. */
    fun proceedAfterCameraPermission(granted: Boolean) {
        if (activity.isFinishing) {
            deliver(null)
            return
        }
        launchChooser(cameraAllowed = granted)
    }

    private fun launchChooser(cameraAllowed: Boolean) {
        val params = pendingParams
        if (params == null) {
            deliver(null)
            return
        }
        val multi = params.mode == WebChromeClient.FileChooserParams.MODE_OPEN_MULTIPLE
        val wantImage = params.acceptTypes?.any {
            it.equals("image/*", true) || it.startsWith("image/", true)
        } ?: false
        val wantVideo = params.acceptTypes?.any {
            it.equals("video/*", true) || it.startsWith("video/", true)
        } ?: false

        val galleryIntent: Intent = Intent(Intent.ACTION_GET_CONTENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = when {
                wantImage && !wantVideo -> "image/*"
                wantVideo && !wantImage -> "video/*"
                wantImage && wantVideo -> "*/*"
                else -> resolveMime(params.acceptTypes)
            }
            if (multi) putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
        }

        val cameraIntent: Intent? = if (cameraAllowed && (wantImage || wantVideo)) {
            createCameraIntent(wantVideo)
        } else null

        val chooser: Intent = if (cameraIntent != null) {
            Intent.createChooser(galleryIntent, "选择图片").apply {
                putExtra(Intent.EXTRA_INITIAL_INTENTS, arrayOf(cameraIntent))
            }
        } else {
            Intent.createChooser(galleryIntent, "选择文件")
        }

        try {
            chooserLauncher.launch(chooser)
        } catch (e: Exception) {
            deliver(null)
        }
    }

    private fun createCameraIntent(video: Boolean): Intent {
        val intent = if (video) Intent(MediaStore.ACTION_VIDEO_CAPTURE) else Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        val dir = File(activity.cacheDir, "captures").apply { mkdirs() }
        val name = "CAP_${System.currentTimeMillis()}" + if (video) ".mp4" else ".jpg"
        val file = File(dir, name)
        cameraUri = FileProvider.getUriForFile(activity, "${activity.packageName}.fileprovider", file)
        intent.putExtra(MediaStore.EXTRA_OUTPUT, cameraUri)
        intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
        return intent
    }

    /** Called with the chooser result. Resolves the selected Uri(s) and delivers them. */
    fun handleResult(resultCode: Int, data: Intent?) {
        if (resultCode != Activity.RESULT_OK) {
            deliver(null)
            return
        }
        val results = mutableListOf<Uri>()
        if (data?.clipData != null) {
            val clip = data.clipData!!
            for (i in 0 until clip.itemCount) {
                clip.getItemAt(i).uri?.let { results.add(it) }
            }
        } else if (data?.data != null) {
            results.add(data.data!!)
        } else if (cameraUri != null) {
            // Camera capture: image was written to our FileProvider URI.
            results.add(cameraUri!!)
        }
        deliver(if (results.isEmpty()) null else results.toTypedArray())
    }

    private fun deliver(uris: Array<Uri>?) {
        try {
            callback?.onReceiveValue(uris)
        } catch (_: Exception) {
        }
        callback = null
        cameraUri = null
        pendingParams = null
    }

    private fun offersCamera(params: WebChromeClient.FileChooserParams): Boolean {
        return params.acceptTypes?.any {
            it.equals("image/*", true) || it.startsWith("image/", true) ||
            it.equals("video/*", true) || it.startsWith("video/", true)
        } ?: false
    }

    private fun resolveMime(acceptTypes: Array<String>?): String {
        if (acceptTypes == null || acceptTypes.isEmpty()) return "*/*"
        // Prefer a concrete mime if provided.
        for (t in acceptTypes) {
            if (t.isBlank()) continue
            if (t.contains("/")) return t
        }
        // Map common extensions.
        for (t in acceptTypes) {
            val ext = t.removePrefix(".").lowercase()
            when (ext) {
                "json" -> return "application/json"
                "txt", "csv" -> return "text/*"
                "pdf" -> return "application/pdf"
            }
        }
        return "*/*"
    }
}
