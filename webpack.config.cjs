const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: {
      name: "nbody",
      type: "umd",
    },
  },
  optimization: {
    usedExports: false,
  },
  externals: {
    three: "three",
    "three/examples/jsm/Addons": "three/examples/jsm/Addons",
    "three/examples/jsm/libs/stats.module":
      "three/examples/jsm/libs/stats.module",
    "plotly.js-dist": "plotly.js-dist",
  },
};
