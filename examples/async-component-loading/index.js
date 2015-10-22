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
  } else {
    require.ensure([], () => {
      cb({
        Component: require("./Small"),
      })
    })
  }
}

const ResponsiveApp = matchMedia(resolveComponents)(App)

render(
  <MediaProvider
    getMedia={viewportGetter}
    listener={viewportListener}>
    <ResponsiveApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
