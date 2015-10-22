import React from "react"
import { render } from "react-dom"
import Header from "./Header"
import { MediaProvider } from "../../src"
import createMediaQueryGetter from "../../src/createMediaQueryGetter"
import createMediaQueryListener from "../../src/createMediaQueryListener"

import "./index.html"

const mediaQueries = {
  maxL: "(max-width: 400px)",
}

render(
  <MediaProvider
    getMedia={createMediaQueryGetter(mediaQueries)}
    listener={createMediaQueryListener(mediaQueries)}>
    <Header />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
