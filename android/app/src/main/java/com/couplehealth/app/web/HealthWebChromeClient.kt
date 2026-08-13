package com.couplehealth.app.web

import android.Manifest
import android.app.Activity
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebStorage
import com.couplehealth.app.BuildConfig
import com.couplehealth.app.util.PermissionHelper

/**
 * Handles the two web features that need native cooperation:
 *  1. <input type="file"> (拍照识别 / 头像 / 数据导入)  -> FileChooserHelper (req 10, 12, 13).
 *  2. onPermissionRequest for AUDIO_CAPTURE / VIDEO_CAPTURE (req 9, microphone / camera via getUserMedia).
 *
 * NEVER clears storage here (req 6). WebStorage.deleteAllData() is deliberately NOT called.
 */
class HealthWebChromeClient(
    private val activity: Activity,
    private val fileChooserHelper: FileChooserHelper,
    private val onMicNeeded: () -> Unit
) : WebChromeClient() {

    override fun onShowFileChooser(
        webView: android.webkit.WebView?,
        filePathCallback: ValueCallback<Array<android.net.Uri>>?,
        fileChooserParams: FileChooserParams?
    ): Boolean {
        if (filePathCallback == null || fileChooserParams == null) return false
        return fileChooserHelper.open(filePathCallback, fileChooserParams)
    }

    override fun onPermissionRequest(request: PermissionRequest) {
        val granted = mutableListOf<String>()
        for (resource in request.resources) {
            when (resource) {
                PermissionRequest.RESOURCE_AUDIO_CAPTURE -> {
                    if (PermissionHelper.hasMic(activity)) {
                        granted.add(resource)
                    } else {
                        // Trigger runtime mic request (result handled by MainActivity); the web
                        // permission will be granted on next request once the user approves.
                        onMicNeeded()
                    }
                }
                PermissionRequest.RESOURCE_VIDEO_CAPTURE -> {
                    if (PermissionHelper.hasCamera(activity)) granted.add(resource)
                }
            }
        }
        activity.runOnUiThread {
            if (granted.isNotEmpty()) request.grant(granted.toTypedArray())
            else request.deny()
        }
    }

    override fun onConsoleMessage(consoleMessage: android.webkit.ConsoleMessage?): Boolean {
        if (BuildConfig.WEB_DEBUG_ENABLED) {
            // Mirror web console into logcat for Chrome-inspector-free debugging.
            consoleMessage?.let {
                android.util.Log.d(
                    "WebConsole",
                    "${it.message()} (${it.sourceId()}:${it.lineNumber()})"
                )
            }
        }
        return true
    }
}
