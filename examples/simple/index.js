import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
import viewportListener from "../../src/listeners/viewportListener"
import viewportGetter from "../../src/getters/viewportGetter"

import "./index.html"

const App = ({ viewportWidth, viewportHeight }) => (
  <div>
    <ul>
      <li>viewportWidth : {viewportWidth}</li>
      <li>viewportHeight : {viewportHeight}</li>
    </ul>
  </div>
)

const WrappedApp = matchMedia()(App)

render(
  <MediaProvider
    getMedia={viewportGetter}
    listener={viewportListener}>
    <WrappedApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
