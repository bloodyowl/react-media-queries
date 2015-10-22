import React from "react"
import { render } from "react-dom"
import { matchMedia, MediaProvider } from "../../src"
import createMediaQueryListener from "../../src/createMediaQueryListener"
import createMediaQueryGetter from "../../src/createMediaQueryGetter"

import "./index.html"

const App = ({ mediaQuery }) => (
  <div>
    mediaQuery is:
    <ul>
      <li>
        small {mediaQuery.small.media}: {`${mediaQuery.small.matches}`}
      </li>
      <li>
        medium {mediaQuery.medium.media}: {`${mediaQuery.medium.matches}`}
      </li>
      <li>
        large {mediaQuery.large.media}: {`${mediaQuery.large.matches}`}
      </li>
    </ul>
  </div>
)

const WrappedApp = matchMedia()(App)

const mediaQueries = {
  small: "(min-width:300px)",
  medium: "(min-width: 400px)",
  large: "(min-width: 500px)",
}

render(
  <MediaProvider
    getMedia={createMediaQueryGetter(mediaQueries)}
    listener={createMediaQueryListener(mediaQueries)}>
    <WrappedApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
