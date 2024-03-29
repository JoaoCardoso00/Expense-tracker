export default {
  "expo": {
    "plugins": [
      "@react-native-google-signin/google-signin"
    ],
    "name": "projeto_gastos",
    "slug": "projeto_gastos",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.cardoso.controlegastos",
      "simulator": true,
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.cardoso.controlegastos",
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "38b8b905-17d9-4b63-80d4-819cb201c6ee"
      }
    }
  }
}
