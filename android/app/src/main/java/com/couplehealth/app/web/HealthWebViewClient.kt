package com.couplehealth.app.web

import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.net.http.SslError
import android.webkit.SslErrorHandler
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebView
import android.webkit.WebViewClient

/**
 * - Keeps the trusted web app inside the WebView.
 * - Redirects every other http/https link (and tel/mailto/intent...) to the system browser,
 *   so untrusted pages can never enter a WebView that owns the Native Bridge (req 27, 29).
 * - Hides the loading overlay once the first frame is committed (no white flash, req 19, 26).
 * - Shows the in-app error page on main-frame network failure (req 25).
 * - Injects the theme observer + back-button helper JS (req 14, 15).
 */
class HealthWebViewClient(
    private val trustedHost: String,
    private val onPageCommit: () -> Unit,
    private val onError: () -> Unit,
    private val onRebind: () -> Unit,
    private val onPageLoaded: () -> Unit = {}
) : WebViewClient() {

    private var firstCommit = false

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val url = request?.url ?: return false
        val scheme = (url.scheme ?: "").lowercase()
        when (scheme) {
            "tel", "mailto", "sms", "intent", "whatsapp", "weixin", "alipays", "alipay" -> {
                return openExternal(view, url)
            }
        }
        if (scheme == "http" || scheme == "https") {
            // Trusted origin (bundled file:// OR the configured formal host) stays in-app.
            if (isTrusted(url)) return false
            return openExternal(view, url) // everything else -> system browser
        }
        if (scheme == "file") return false // bundled debug assets
        return false
    }

    private fun isTrusted(url: Uri): Boolean {
        val scheme = (url.scheme ?: "").lowercase()
        if (scheme == "file") return true
        val host = url.host?.lowercase() ?: return false
        if (trustedHost.isEmpty()) return false
        return host == trustedHost.lowercase()
    }

    private fun openExternal(view: WebView?, url: Uri): Boolean {
        runCatching {
            view?.context?.startActivity(
                Intent(Intent.ACTION_VIEW, url).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            )
        }
        return true
    }

    override fun onPageCommitVisible(view: WebView?, url: String?) {
        super.onPageCommitVisible(view, url)
        // First real paint — hide the loading overlay so Splash -> WebView never flashes white.
        if (!firstCommit) {
            firstCommit = true
            onPageCommit()
        }
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        injectHelpers(view)
        onPageLoaded() // Re-push safe-area CSS variables on every page load/reload
        if (!firstCommit) {
            firstCommit = true
            onPageCommit()
        }
    }

    private fun injectHelpers(view: WebView?) {
        // Idempotent: defines __coupleHealthBridgeReady guard so re-injection is a no-op.
        view?.evaluateJavascript(BRIDGE_HELPERS_JS, null)
    }

    override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
        super.onReceivedError(view, request, error)
        if (request?.isForMainFrame == true) onError()
    }

    override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?, errorResponse: WebResourceResponse?) {
        super.onReceivedHttpError(view, request, errorResponse)
        if (request?.isForMainFrame == true && (errorResponse?.statusCode ?: 0) >= 400) onError()
    }

    override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
        // Do not load pages with broken SSL. Treat as a network error.
        handler?.cancel()
        if (error != null) onError()
    }

    override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
        // Renderer crashed — recreate the WebView host so the app does not stay blank.
        onRebind()
        return true
    }

    companion object {
        // Injected after each page load. Sets up:
        //  1) theme observer -> AndroidBridge.onThemeChange(theme) for system bar sync
        //  2) window.__nativeBack() -> returns "closed" if a modal/sheet/picker was closed, else "none"
        private val BRIDGE_HELPERS_JS = """
(function(){
  if(window.__coupleHealthBridgeReady) return;
  window.__coupleHealthBridgeReady=true;
  function readTheme(){
    var t=document.documentElement.getAttribute('data-theme');
    return (t==='light'||t==='dark')?t:'dark';
  }
  function notifyTheme(){
    try{ if(window.AndroidBridge&&window.AndroidBridge.onThemeChange){ window.AndroidBridge.onThemeChange(readTheme()); } }catch(e){}
  }
  try{ notifyTheme(); }catch(e){}
  try{
    new MutationObserver(function(){ notifyTheme(); })
      .observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  }catch(e){}
  /* Safe-area injection is handled solely by MainActivity.pushSafeAreaToWeb()
     via evaluateJavascript() on the main thread. This avoids duplicate writes
     to --android-safe-top/bottom from two different code paths. */
  window.__nativeBack=function(){
    try{
      var qa=document.getElementById('quickAddPanel');
      if(qa&&qa.classList.contains('active')){
        if(typeof window.closeQuickAddPanel==='function'){window.closeQuickAddPanel();}
        else{qa.classList.remove('active');var o=document.getElementById('quickAddOverlay');if(o)o.classList.remove('active');}
        return 'closed';
      }
      var ms=document.querySelectorAll('.modal-overlay.show');
      if(ms&&ms.length){
        var last=ms[ms.length-1];
        if(typeof closeModal==='function'){closeModal(last.id);}else{last.classList.remove('show');}
        return 'closed';
      }
      var g=document.querySelector('.glass-dropdown.open,.glass-date-field.open,.glass-date-panel,#dateTitleBtn.glass-date-open');
      if(g){
        if(window.GlassUI&&typeof GlassUI.closeAll==='function'){GlassUI.closeAll();}
        return 'closed';
      }
      return 'none';
    }catch(e){return 'none';}
  };
  /* ---- Export download shim (req 13) ----
     WebView cannot download Blob URLs. Intercept createObjectURL to keep Blob refs,
     patch HTMLAnchorElement.click so `<a download>` with a blob: href is read as base64
     and handed to AndroidBridge.saveFile. Web data format is unchanged. */
  if(!window.__blobDownloadPatched){
    window.__blobDownloadPatched=true;
    var __blobStore={};
    var __origCreate=URL.createObjectURL;
    URL.createObjectURL=function(b){
      var u=__origCreate.call(URL,b);
      try{if(b instanceof Blob){__blobStore[u]=b;}}catch(e){}
      return u;
    };
    var __origRevoke=URL.revokeObjectURL;
    URL.revokeObjectURL=function(u){
      setTimeout(function(){try{delete __blobStore[u];}catch(e){}__origRevoke.call(URL,u);},60000);
    };
    var __origClick=HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click=function(){
      try{
        var h=this.href||''; var dl=this.getAttribute('download');
        if(h.indexOf('blob:')===0&&dl){
          var b=__blobStore[h];
          if(b){
            var nm=dl;
            var rd=new FileReader();
            rd.onload=function(){
              var b64=(rd.result.split(',')[1])||'';
              if(window.AndroidBridge&&window.AndroidBridge.saveFile){window.AndroidBridge.saveFile(nm,b64);}
            };
            rd.readAsDataURL(b);
            return;
          }
        }
      }catch(e){}
      return __origClick.apply(this,arguments);
    };
  }
})();
        """.trimIndent()
    }
}
