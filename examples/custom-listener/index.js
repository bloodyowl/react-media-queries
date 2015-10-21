import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
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

const debounce = (func, delay) => {
  let timeout = null
  return (...args) => {
    if(timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      timeout = null
      func(...args)
    }, delay)
    return timeout
  }
}

const debouncedViewportListener = (update) => {
  const listener = debounce(update, 500)
  window.addEventListener("resize", listener)
  return () => window.removeEventListener("resize", listener)
}

render(
  <MediaProvider
    getMedia={viewportGetter}
    listener={debouncedViewportListener}>
    <WrappedApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
