const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./index.js",
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker",
	"kusto.worker": "@kusto/monaco-kusto/release/esm/kusto.worker",
  },
  output: {
    globalObject: "self",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "vs/language/kusto/kustoMode": "kustoMode",
      "bridge.min": "@kusto/monaco-kusto/release/esm/bridge.min",
      "kusto.javascript.client.min":
        "@kusto/monaco-kusto/release/esm/kusto.javascript.client.min.js",
      "Kusto.Language.Bridge.min":
        "@kusto/monaco-kusto/release/esm/Kusto.Language.Bridge.min.js",
      Kusto: "@kusto/monaco-kusto/release/esm/Kusto.Language.Bridge.min.js",
      "monaco.contribution":
        "@kusto/monaco-kusto/release/esm/monaco.contribution",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      { test: /bridge\.js/, parser: { system: false } },
      { test: /kusto\.javascript\.client\.min\.js/, parser: { system: false } },
      { test: /Kusto\.Language\.Bridge\.min\.js/, parser: { system: false } },
      { test: /kustoLanguageService/, parser: { system: false }, use: { loader: path.resolve('kustoLanguageServiceLoader.js')} },
      {
        test: /Kusto\.Language\.Bridge\.min/,
        loader:
          "exports-loader?window.Kusto!imports-loader?bridge.min,kusto.javascript.client.min",
      },
      {
        test: /kustoMonarchLanguageDefinition/,
        loader: "imports-loader?Kusto",
      },
    ],
  },
};
