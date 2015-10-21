import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
import viewportListener from "../../src/viewportListener"
import viewportGetter from "../../src/viewportGetter"

import "./index.html"

const App = ({ Component }) => (
  <div>
    {Component ? <Component /> : "loading …"}
  </div>
)

const resolveComponents = ({ viewport }, cb) => {
  if(viewport.width > 400) {
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
