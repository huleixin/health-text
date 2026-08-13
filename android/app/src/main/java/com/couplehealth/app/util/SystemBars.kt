package com.couplehealth.app.util

import android.app.Activity
import android.graphics.Color
import androidx.core.view.WindowInsetsControllerCompat

/**
 * Syncs the Android status bar + navigation bar icon appearance with the web app's theme.
 *
 * Strategy (true Edge-to-Edge):
 *  - System bar backgrounds are fully transparent — the WebView draws behind them.
 *  - Only the icon appearance (light/dark) is controlled here, driven by the web theme.
 *  - Light theme => dark icons (visible on light bg).
 *  - Dark theme => light icons (visible on dark bg).
 *  - Contrast enforcement for 3-button nav is handled by the system (enableEdgeToEdge).
 */
object SystemBars {

    fun applyTheme(activity: Activity, theme: String) {
        val window = activity.window ?: return
        val isLight = theme == "light"

        // Transparent bars: the web app's background shows through.
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT

        val controller = WindowInsetsControllerCompat(window, window.decorView)
        // true  => dark icons (use on light background)
        // false => light icons (use on dark background)
        controller.isAppearanceLightStatusBars = isLight
        controller.isAppearanceLightNavigationBars = isLight
    }
}
