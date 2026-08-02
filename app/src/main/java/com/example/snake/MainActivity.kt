package com.example.snake

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {

    private var webView: WebView? = null

    inner class WebAppInterface(private val context: Context) {
        private val vibrator: Vibrator? by lazy {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val vm = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
                vm?.defaultVibrator
            } else {
                @Suppress("DEPRECATED")
                context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
            }
        }

        @JavascriptInterface
        fun vibrate(ms: Long) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibrator?.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE))
                } else {
                    @Suppress("DEPRECATED")
                    vibrator?.vibrate(ms)
                }
            } catch (_: Exception) {}
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        )

        webView = WebView(this).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )

            setBackgroundColor(android.graphics.Color.parseColor("#08090D"))

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                useWideViewPort = true
                loadWithOverviewMode = true
                allowFileAccess = true
                mediaPlaybackRequiresUserGesture = false
                cacheMode = WebSettings.LOAD_DEFAULT
            }

            addJavascriptInterface(WebAppInterface(this@MainActivity), "AndroidVibration")

            webViewClient = WebViewClient()
            loadUrl("file:///android_asset/index.html")
        }

        setContentView(webView)
    }

    override fun onPause() {
        super.onPause()
        webView?.onPause()
        webView?.pauseTimers()
    }

    override fun onResume() {
        super.onResume()
        webView?.onResume()
        webView?.resumeTimers()
    }

    override fun onStop() {
        super.onStop()
        webView?.onPause()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        webView?.evaluateJavascript("if (window.handleAndroidBack) { window.handleAndroidBack(); } else { 'exit'; }") { result ->
            val res = result?.trim('"')?.lowercase()
            if (res == "exit" || res == "false") {
                moveTaskToBack(true)
            }
        }
    }

    override fun onDestroy() {
        webView?.destroy()
        webView = null
        super.onDestroy()
    }
}
