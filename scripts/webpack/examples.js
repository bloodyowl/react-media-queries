import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import path from "path"

import JsdomTapePlugin from "webpack-jsdom-tape-plugin"

const location = {
  protocol: "http://",
  host: "0.0.0.0",
  port: 3002,
  open: true,
}

const serverUrl = `${ location.protocol }${ location.host }:${ location.port }`

const config = {
  entry: {
    "examples/simple/index": "./examples/simple/index.js",
    "examples/async-component-loading/index": "./examples/async-component-loading/index.js",
    "examples/sync-component-loading/index": "./examples/sync-component-loading/index.js",
    "examples/custom-listener/index": "./examples/custom-listener/index.js",
  },
  output: {
    path: path.join(__dirname, "../../dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          stage: 0,
        },
      },
      {
        test: /\.html$/,
        loader: "file?name=[path][name].html",
      },
    ],
  }
}

const server = new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  stats: {
    colors: true,
    chunkModules: false,
    assets: true,
  },
  noInfo: true,
  historyApiFallback: true,
})

server.listen(
  location.port,
  location.host
)

export default config
