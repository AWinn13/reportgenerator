const rules = require("./webpack.rules");
const path = require('path');
rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  entry: './src/renderer.js',
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
      net: false,
      tls: false,
    },
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, '.webpack/renderer'),
  },
};