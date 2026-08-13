# CoupleHealth Android (WebView 容器)

本目录是「双人健康助手」Web App 的 **Android 原生 WebView 容器**。
Web App 本身（`../index.html` 等业务/UI/同步逻辑）保持不变，Android 层只负责：
容器、WebView、系统权限、相机/麦克风/文件、返回键、状态栏/导航栏、Splash、网络异常、生命周期、Native Bridge。

## 架构

```
Web App (index.html, 不重写)
   ↕  window.AndroidBridge  (仅可信域名可用)
Android WebView 容器 (Kotlin + AndroidX)
```

## 1. 用 Android Studio 打开

Android Studio → `File` → `Open` → 选择本 `android/` 目录。

## 2. 修改 Debug Web URL

`gradle.properties` 中：

```properties
APP_WEB_URL_DEBUG=file:///android_asset/web/index.html
```

- 默认加载 **打包在本地的 Web App**（`app/src/main/assets/web/`），开箱即用，本地记录/图表/双人空间/同步等核心功能可测。
- 想连本地/测试服务器：改为 `http://10.0.2.2:xxxx`（模拟器）或你的局域网地址。
- 想用线上完整功能（含 `/api/` 服务端 AI：食物搜索/运动搜索/拍照识别）：改为你的 Cloudflare Pages 地址。

## 3. Release URL 在哪里

`gradle.properties` 中：

```properties
APP_WEB_URL_RELEASE=https://your-cloudflare-pages-url.pages.dev
```

发布版加载正式 HTTPS 地址 → Git 提交 → Cloudflare 自动部署 → App 自动使用新版网页。
**发布前必须把占位地址改成你的真实 Cloudflare Pages 地址。**

## 4. 运行

```bash
./gradlew :app:installDebug   # 安装到连接的设备
# 或在 Android Studio 中点 Run
```

## 5. 生成 Debug APK

```bash
./gradlew :app:assembleDebug
# 产物：app/build/outputs/apk/debug/app-debug.apk
```

## 6. 生成 Release APK

```bash
./gradlew :app:assembleRelease
# 产物：app/build/outputs/apk/release/app-release.apk
```

## 7. 生成 AAB（上架 Google Play 用）

```bash
./gradlew :app:bundleRelease
# 产物：app/build/outputs/bundle/release/app-release.aab
```

## 8. 配置签名

当前 release 默认复用 debug 签名（仅为方便测试）。正式发布前：

1. 生成 keystore：
   ```bash
   keytool -genkey -v -keystore couplehealth.keystore -alias couplehealth -keyalg RSA -keysize 2048 -validity 10000
   ```
2. 在 `android/` 下新建 `keystore.properties`（**已被 .gitignore 忽略，不会提交**）：
   ```properties
   storeFile=couplehealth.keystore
   storePassword=你的密码
   keyAlias=couplehealth
   keyPassword=你的密码
   ```
3. 在 `app/build.gradle` 的 `signingConfigs` 中读取该文件并赋给 `release.signingConfig`。

> 永远不要把 keystore、storePassword、keyPassword 提交到 Git。

## 9. Native Bridge 代码在哪里

- 接口定义：`app/src/main/java/com/couplehealth/app/bridge/NativeBridge.kt`
- 宿主实现：`MainActivity.kt`（实现 `BridgeHost`）
- 注入位置：`MainActivity.setupWebView()` 中 `addJavascriptInterface(nativeBridge, "AndroidBridge")`
- 安全：`HealthWebViewClient` 把所有非可信域名的跳转转给系统浏览器，因此外部页面永远无法接触 Bridge。

桥接注入的辅助 JS（主题同步、返回键、导出下载）在 `web/HealthWebViewClient.kt` 的 `BRIDGE_HELPERS_JS`。

## 10. 以后 Health Connect 从哪里接入

1. 在 `app/build.gradle` 添加依赖：
   ```groovy
   implementation "androidx.health.connect:connect-client:1.1.0-alpha02"
   ```
2. 在 `AndroidManifest.xml` 添加 Health Connect 权限与 `<queries>`。
3. 在 `bridge/NativeBridge.kt` 取消注释/新增 `getStepCount()`、`requestHealthConnect()` 等 `@JavascriptInterface` 方法（**不要造假数据**）。
4. 在 `MainActivity` 中实现真实读取逻辑并回传给 JS。

## 通知预留

后续若要饮水/运动/睡眠/纪念日提醒，在 `app/src/main/java/com/couplehealth/app/` 下新建 `notification/` 与 `worker/` 包，配合 WorkManager。本轮未实现后台通知。

## 关键约定

- **localStorage 长期保留**：`domStorageEnabled=true`，生命周期中绝不调用 `clearCache` / `WebStorage.deleteAllData` / `removeAllCookies`。
- **设备身份 `current_profile_id` 设备独立**：完全由 Web localStorage 维护，不进 Supabase 同步，Android 层不触碰。
- **权限**：仅 `INTERNET` / `CAMERA` / `RECORD_AUDIO`。
- **WebView 调试**：Debug 开启、Release 关闭。
- **同步架构、双人逻辑、健康业务逻辑未做任何修改。**
