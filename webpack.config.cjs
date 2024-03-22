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

          // compilerOptions: {
          //   module: "esnext",
          // },
        },
      },
    ],
  },
  // plugins: [new ThreadsPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: {
      name: "celestial",
      type: "umd",
    },
  },
  externals: {
    three: "three",
    "plotly.js-dist": "plotly.js-dist",
  },
};
