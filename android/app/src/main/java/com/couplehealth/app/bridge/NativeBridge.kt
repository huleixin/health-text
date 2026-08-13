package com.couplehealth.app.bridge

import android.webkit.JavascriptInterface

/**
 * Lightweight Android <-> JavaScript bridge.
 *
 * Injected as `window.AndroidBridge`. Untrusted URLs are redirected to the system
 * browser (see HealthWebViewClient), so they can never reach this interface.
 *
 * Future native capabilities (Health Connect, notifications, share, haptic...)
 * will be added here. They are intentionally NOT implemented yet — no fake data
 * is ever returned.
 */
class NativeBridge(private val host: BridgeHost) {

    /** Called by the web app whenever `data-theme` on <html> changes. Values: "dark" | "light". */
    @JavascriptInterface
    fun onThemeChange(theme: String?) {
        host.onThemeChange(if (theme == "light") "light" else "dark")
    }

    /** Called by the web app when the first meaningful frame is ready. */
    @JavascriptInterface
    fun onReady() {
        host.onReady()
    }

    /**
     * Minimal download bridge: the web app exports JSON via a Blob URL + `<a download>`,
     * which Android WebView cannot download natively. The injected shim reads the Blob as
     * base64 and calls this. Data format is NOT modified (req 13).
     */
    @JavascriptInterface
    fun saveFile(name: String?, base64: String?) {
        host.saveFile(name ?: "download.json", base64 ?: "")
    }

    /**
     * Returns the production API base URL so the web app can resolve relative API paths
     * (e.g. /api/food-search) when running from file scheme (Android debug build with
     * bundled assets). In release builds the web app is loaded from the HTTPS origin,
     * so the web code uses same-origin relative paths and does not call this method.
     */
    @JavascriptInterface
    fun getApiBaseUrl(): String {
        return com.couplehealth.app.BuildConfig.WEB_API_BASE_URL
    }

    /**
     * Returns the real status bar safe-area height in CSS pixels (DIP).
     * Used by the web app because env(safe-area-inset-top) may return 0 in some WebViews.
     */
    @JavascriptInterface
    fun getSafeAreaTop(): Int = host.getSafeAreaTop()

    /**
     * Returns the real navigation bar safe-area height in CSS pixels (DIP).
     * Used by the web app because env(safe-area-inset-bottom) may return 0 in some WebViews.
     */
    @JavascriptInterface
    fun getSafeAreaBottom(): Int = host.getSafeAreaBottom()

    /*
     * ---- Reserved for future native capabilities (do NOT fake data) ----
     *
     * // Health Connect (see android/README.md "以后Health Connect从哪里接入")
     * // @JavascriptInterface fun getStepCount(): String
     * // @JavascriptInterface fun requestHealthConnect(): Unit
     *
     * // Notifications (see notification/ worker/ planned structure)
     * // @JavascriptInterface fun scheduleNotification(time: String, title: String, body: String): Unit
     *
     * // System share / haptic
     * // @JavascriptInterface fun share(text: String): Unit
     * // @JavascriptInterface fun haptic(type: String): Unit
     */
}

interface BridgeHost {
    fun onThemeChange(theme: String)
    fun onReady()
    fun saveFile(name: String, base64: String)
    fun getSafeAreaTop(): Int
    fun getSafeAreaBottom(): Int
}
