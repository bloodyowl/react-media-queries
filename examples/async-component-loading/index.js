import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
import viewportListener from "../../src/listeners/viewportListener"
import viewportGetter from "../../src/getters/viewportGetter"

import "./index.html"

const App = ({ Component }) => (
  <div>
    {Component ? <Component /> : "loading …"}
  </div>
)

const resolveComponents = ({ viewportWidth }, cb) => {
  if(viewportWidth > 400) {
    require.ensure([], () => {
      cb({
        Component: require("./Big"),
      })
    })
    return
  }
  require.ensure([], () => {
    cb({
      Component: require("./Small"),
    })
  })
}

const WrappedApp = matchMedia(resolveComponents)(App)

render(
  <MediaProvider
    getMedia={viewportGetter}
    listener={viewportListener}>
    <WrappedApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
