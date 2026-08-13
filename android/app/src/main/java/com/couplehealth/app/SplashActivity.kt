package com.couplehealth.app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

/**
 * Splash entry. The splash theme's windowBackground already draws the logo on the dark
 * web background, so there is no white frame at launch. After the first frame is shown we
 * hand off to MainActivity (whose window background is also dark) for a seamless transition.
 */
class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // No content view: the theme windowBackground provides the logo. Brief display so the
        // splash is actually seen, then move on.
        window.decorView.postDelayed({
            if (!isFinishing) {
                startActivity(Intent(this, MainActivity::class.java))
                finish()
                @Suppress("DEPRECATION")
                overridePendingTransition(0, 0) // no transition flash
            }
        }, 450)
    }
}
