# WebView container — no special keep rules needed for the WebView itself.
# Keep the JS Bridge interface (called from JavaScript via addJavascriptInterface).
-keepclassmembers class com.couplehealth.app.bridge.** {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.couplehealth.app.bridge.** { *; }
