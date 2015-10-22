# react-media-queries

[![Build Status](https://travis-ci.org/bloodyowl/react-media-queries.svg?branch=master)](https://travis-ci.org/bloodyowl/react-media-queries)

Extensible Media Queries for React.

## Install

```console
$ npm install --save react-media-queries
```

## API

### `<MediaProvider />`

A component that provides Media Query data to the `matchMedia()` calls in the
component hierarchy below. You can't use `matchMedia()` without wrapping the a
component (e.g., the root component) in `<MediaProvider>`.

#### Props

* `children` (*ReactElement*) The root of your component hierarchy.
- `getMedia` (*Function*): Return the current global media state.
- `initialMedia` (*Object*): Provide default values for server-side rendering.
- `listener` (*Function*): Listens to media changes, and returns a function that stops listening.

#### Example

```javascript
import React from "react"
import { render } from "react-dom"
import { MediaProvider } from "react-media-queries"
import viewportListener from "react-media-queries/lib/viewportListener"
import viewportGetter from "react-media-queries/lib/viewportGetter"

render(
  <MediaProvider getMedia={viewportGetter} listener={viewportListener}>
    <ResponsiveApp />
  </MediaProvider>,
  targetEl
)
```

### matchMedia([resolveComponent][, mergeProps])

Connects a React component to the media data. It returns a new, connected
component class (i.e., it does not modify the component class passed to it).

#### Arguments

- `resolveComponent(media, cb)` (*Function*): Resolves the component that will
  receive props. Resolution is synchronous when returning a component, and
  asynchronously when calling `cb` with the resolved component.
- `mergeProps(ownProps, mediaProps, componentProps)` (*Function*): Custom prop merging

#### Example

```javascript
import React from "react"
import { matchMedia } from "react-media-queries"
import resolveComponentsSync from "./resolveComponentsSync"

const App = ({ Component }) => (
  <div>
    {Component ? <Component /> : "loading…"}
  </div>
)

const ResponsiveApp = matchMedia(resolveComponentsSync)(App)
```

Synchronous resolver:

```javascript
const resolveComponentsSync = ({ mediaQuery, viewport }, cb) => {
  const isBig = mediaQuery.portrait.matches && (viewport.width > 400)
  return {
    Component: isBig ? require("./Big") : require("./Small"),
  }
}
```

Asynchronous resolver:

```javascript
const resolveComponentsAsync = ({ viewport }, cb) => {
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
```

You can also mix the synchronous approach with the asynchronous one, for instance if you have the mobile component in your bundle and want to lazy-load the desktop one if needed :

```javascript
const resolveComponentsAsync = ({ viewport }, cb) => {
  if(viewport.width > 400) {
    require.ensure([], () => {
      cb({
        Component: require("./Big"),
      })
    })
  } else {
    return {
      Component: MobileComponent,
    }
  }
}
```

## Listeners

Listeners determine when media data needs to be recalculated. There are 2
predefined listeners: `viewportListener` and `createMediaQueryListener`. Custom
listeners are also supported.

### viewportListener

Listens to `resize` events on the `window`.

```javascript
import viewportListener from "react-media-queries/lib/viewportListener"
```

### createMediaQueryListener(mediaQueries: Object)

Listens to `window.mediaMatch` events for the given Media Queries.

```javascript
import createMediaQueryListener from "react-media-queries/lib/createMediaQueryListener"

const mediaQueries = {
  small: "(min-width:300px)",
  medium: "(min-width: 400px)",
  large: "(min-width: 500px)",
}

const mediaQueryListener = createMediaQueryListener(mediaQueries)
```

### composeListener(...listeners)

Compose multiple listeners into one.

```javascript
import composeListener from "react-media-queries/lib/composeListener"

const listener = composeListener(viewportListener, mediaQueryListener)
```

### Creating your own listener

A listener is a function that accepts an `update` function argument. The
listener should start listening to its event, and call `update` when it
considers it needs to. The listener should return a function that removes the
change listener.

```javascript
const debouncedViewportListener = (update) => {
  const listener = debounce(update, 500)
  window.addEventListener("resize", listener)
  return () => window.removeEventListener("resize", listener)
}
```

## Getters

Getters determine what media data is provided to components. There are 2
predefined getters: `viewportGetter` and `createMediaQueryGetter`. Custom
getters are also supported.

### viewportGetter

Returns the current viewport dimensions in the form: `{ viewport: { height, width } }`

```javascript
import viewportGetter from "react-media-queries/lib/viewportGetter"
```

### createMediaQueryGetter(mediaQueries: Object)

Returns the current Media Query states in the form: `{ mediaQuery: { [alias]: {
matches, media } } }`. `matches` is a boolean, `media` is the Media Query
string represented by the alias.

```javascript
import createMediaQueryGetter from "react-media-queries/lib/createMediaQueryGetter"

const mediaQueries = {
  small: "(min-width:300px)",
  medium: "(min-width: 400px)",
  large: "(min-width: 500px)",
}

const mediaQueryGetter = createMediaQueryGetter(mediaQueries)
```

### composeGetters(...getters)

Compose multiple getters into one.

```javascript
import composeGetter from "react-media-queries/lib/composeGetter"

const getter = composeGetter(viewportGetter, mediaQueryGetter)
```

### Creating your own getter

A getter must return an object representing the current state at that point in
time.

```javascript
const scrollGetter = () => ({
  scrollY: window.pageYOffset,
  scrollX: window.pageXOffset,
})
```
