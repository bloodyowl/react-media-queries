import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
import viewportListener from "../../src/viewportListener"
import viewportGetter from "../../src/viewportGetter"

import "./index.html"

const App = ({ viewport }) => (
  <div>
    <ul>
      <li>viewport.width : {viewport.width}</li>
      <li>viewport.height : {viewport.height}</li>
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
