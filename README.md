# react-media-queries

## install

```console
$ npm install --save react-media-queries
```

## api

### <MediaProvider />

#### props

- `initialMedia`, object, to provide default values for server-side rendering
- `getMedia`, function that returns the current global media state
- `listener`, func that listens to the media changes, and returns a function that stops listening

#### example

```javascript
import React from "react"
import { render } from "react-dom"
import { MediaProvider } from "react-media-queries"
import viewportListener from "react-media-queries/lib/viewportListener"
import viewportGetter from "react-media-queries/lib/viewportGetter"


render(
  <MediaProvider
    getMedia={viewportGetter}
    listener={viewportListener}>
    <WrappedApp />
  </MediaProvider>,
  document.body.appendChild(document.createElement("div"))
)
```

### func matchMedia([resolveComponent][, mergeProps])

#### args

- `resolveComponent(media, cb)`, function that resolves components to be passed as props. it can resolve it synchronously by returning the components, or asynchronously by calling `cb` with the resolved components
- `mergeProps(ownProps, mediaProps, componentProps)`, function that merges props

#### example

```javascript
import React from "react"
import { matchMedia } from "../../src"

const App = ({ Component }) => (
  <div>
    {Component ? <Component /> : "loading …"}
  </div>
)

const resolveComponents = ({ viewportWidth }, cb) => {
  return {
    Component: viewportWidth > 400 ? Big : Small,
  }
}

const WrappedApp = matchMedia(resolveComponents)(App)
```

## listeners

### composeListener (react-media-queries/lib/composeListeners)

can be used to compose multiple listeners into one

### viewportListener (react-media-queries/lib/viewportListener)

listens to viewport size changes

### creating your own listener

a listener is a function that one `update` function arguments. the listener
should start listening to its event, and call `update` when it considers it
needs to. this function should return a function that makes it stop listening
for changes.

#### example

```javascript
const debouncedViewportListener = (update) => {
  const listener = debounce(update, 500)
  window.addEventListener("resize", listener)
  return () => window.removeEventListener("resize", listener)
}
```

## getters

### composeGetters (react-media-queries/lib/composeGetters)

can be used to compose multiple getters into one

### viewportGetters (react-media-queries/lib/viewportGetter)

gets the current viewport state

### creating your own getter

a getter should return an object with the current state at any point in time

#### example

```javascript
const scrollGetter = () => ({
  scrollY: window.pageYOffset,
  scrollX: window.pageXOffset,
})
```
