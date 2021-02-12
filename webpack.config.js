const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './index.js',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    'kusto.worker': '@kusto/monaco-kusto/release/esm/kusto.worker',
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      // "vs/language/kusto/kustoMode": "kustoMode", // This does not resolve so using the below
      // 'bridge.min': '@kusto/monaco-kusto/release/esm/bridge.min', // This does not resolve so using the below
      // 'kusto.javascript.client.min': '@kusto/monaco-kusto/release/esm/kusto.javascript.client.min.js', // File does not exist so using the below
      // 'Kusto.Language.Bridge.min': '@kusto/monaco-kusto/release/esm/Kusto.Language.Bridge.min.js',
      // Kusto: '@kusto/monaco-kusto/release/esm/Kusto.Language.Bridge.min.js', // This file doesn't exist, try the below
      'vs/language/kusto/kustoMode': '@kusto/monaco-kusto/release/esm/kustoMode',
      // 'bridge.min': '@kusto/language-service/bridge.min',
      'bridge': '@kusto/language-service/bridge',
      // 'kusto.javascript.client.min': '@kusto/language-service/Kusto.JavaScript.Client.min.js',
      'kusto.javascript.client': '@kusto/language-service/Kusto.JavaScript.Client.js',
      // 'Kusto.Language.Bridge.min': '@kusto/language-service-next/Kusto.Language.Bridge.min.js',
      'Kusto.Language.Bridge': '@kusto/language-service-next/Kusto.Language.Bridge.js',
      // Kusto: '@kusto/language-service-next/Kusto.Language.Bridge.min.js',
      Kusto: '@kusto/language-service-next/Kusto.Language.Bridge.js',
      'monaco.contribution': '@kusto/monaco-kusto/release/esm/monaco.contribution',
    },
  },
  node: {
    fs: 'empty'
  },
  module: {
    // noParse: [
    //   /bridge\.min/,
    //   /kusto\.javascript\.client\.min\.js/,
    //   /kustoLanguageService/,
    //   /Kusto\.Language\.Bridge\.min/,
    // ],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
      { test: /bridge\.js/, parser: { system: false } },
      { test: /bridge\.min\.js/, parser: { system: false } },
      { test: /kusto\.javascript\.client\.min\.js/, parser: { system: false } },
      { test: /kusto\.javascript\.client\.js/, parser: { system: false } },
      { test: /Kusto\.JavaScript\.Client\.min\.js/, parser: { system: false } },
      { test: /Kusto\.JavaScript\.Client\.js/, parser: { system: false } },
      { test: /Kusto\.Language\.Bridge\.min\.js/, parser: { system: false } },
      { test: /Kusto\.Language\.Bridge\.js/, parser: { system: false } },
      {
        test: /kustoLanguageService/,
        parser: { system: false },
        use: { loader: path.resolve('kustoLanguageServiceLoader.js') },
      },
      // {
      //   test: /Kusto\.Language\.Bridge\.min/,
      //   loader: 'exports-loader?window.Kusto!imports-loader?bridge.min,kusto.javascript.client.min',
      // },
      {
        test: /Kusto\.Language\.Bridge/,
        use: [{
          // loader: 'exports-loader',
          // options: {
          //   exports: 'Kusto'
          // },
          loader: 'imports-loader',
          options: {
            type: 'commonjs',
            imports: [
              'single bridge Bridge',
              // 'single kusto.javascript.client Kusto'
            ]
          }
        }]
      },
      {
        test: /kustoMonarchLanguageDefinition/,
        //        loader: "imports-loader?Kusto",
        loader: 'imports-loader',
        options: {
          // type: 'commonjs',
          imports: [
            'side-effects Kusto',
            'side-effects kusto.javascript.client'
          ],
        },
      }
    ],
  },
};
