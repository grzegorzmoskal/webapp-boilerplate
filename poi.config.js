module.exports = {
    entry: "src/index.tsx",
    presets: [require("poi-preset-react")(), require("poi-preset-typescript")()],
    env: {
        APP_DESCRIPTION: "example app"
    }
}
