const OfflinePlugin = require("offline-plugin")

module.exports = {
    entry: "src/index.tsx",
    presets: [require("poi-preset-react")(), require("poi-preset-typescript")()],
    env: {
        APP_DESCRIPTION: "example app"
    },
    plugins: [
        // ... other plugins
        // it's always better if OfflinePlugin is the last plugin added
        new OfflinePlugin()
    ]
}
