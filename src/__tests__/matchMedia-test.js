import React, { Component, PropTypes } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import MediaProvider from "../MediaProvider"
import matchMedia from "../matchMedia"

tape("matchMedia", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = (props) => {
    test.deepEqual(props, initialMedia, "passes props correcly")
    test.end()
    return <div />
  }
  const ResponsiveDummy = matchMedia()(Dummy)
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy />
    </MediaProvider>
  )
})

tape("matchMedia mergeProps", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = (props) => {
    test.deepEqual(props, initialMedia, "passes props correcly")
    test.end()
    return <div />
  }
  const resolveComponents = () => ({
    bar: "baz",
  })
  const mergeProps = (ownProps, mediaProps, componentProps) => {
    test.deepEqual(ownProps, { foo: "bar" }, "ownProps")
    test.deepEqual(mediaProps, initialMedia, "mediaProps")
    test.deepEqual(componentProps, {bar: "baz"}, "componentProps")
    return {
      ...initialMedia,
    }
  }
  const ResponsiveDummy = matchMedia(resolveComponents, mergeProps)(Dummy)
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy foo="bar"/>
    </MediaProvider>
  )
})

tape("matchMedia default mergeProps", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = (props) => {
    test.deepEqual(
      props,
      {...initialMedia, foo: "baz"},
      "passes props correctly"
    )
    test.end()
    return <div />
  }
  const resolveComponents = () => ({
    foo: "baz",
  })
  const ResponsiveDummy = matchMedia(resolveComponents)(Dummy)
  const initialConsoleError = console.error
  console.error = (message) => {
    test.equal(
      message,
      "react-media-queries : colliding key foo in props merge",
      "warns if colliding keys between ownProps & componentProps"
    )
  }
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy foo="bar"/>
    </MediaProvider>
  )
  console.error = initialConsoleError
})

tape("matchMedia default mergeProps", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = (props) => {
    test.deepEqual(
      props,
      {...initialMedia, foo: "baz"},
      "passes props correctly"
    )
    test.end()
    return <div />
  }
  const resolveComponents = () => ({
    foo: "baz",
  })
  const ResponsiveDummy = matchMedia(resolveComponents)(Dummy)
  const initialConsoleError = console.error
  console.error = (message) => {
    test.equal(
      message,
      "react-media-queries : colliding key testProp in props merge",
      "warns if colliding keys between ownProps & mediaProps"
    )
  }
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy testProp="bar"/>
    </MediaProvider>
  )
  console.error = initialConsoleError
})

tape("matchMedia default mergeProps", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = (props) => {
    test.deepEqual(
      props,
      { testProp: "baz", foo: "bar"},
      "passes props correctly"
    )
    test.end()
    return <div />
  }
  const resolveComponents = () => ({
    testProp: "baz",
  })
  const ResponsiveDummy = matchMedia(resolveComponents)(Dummy)
  const initialConsoleError = console.error
  console.error = (message) => {
    test.equal(
      message,
      "react-media-queries : colliding key testProp in props merge",
      "warns if colliding keys between componentProps & mediaProps"
    )
  }
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy foo="bar"/>
    </MediaProvider>
  )
  console.error = initialConsoleError
})

tape("matchMedia async resolve component", (test) => {
  const Dummy = ({ asyncValue }) => {
    if(asyncValue) {
      test.equal(asyncValue, 1, "asynchronously resolved")
      test.end()
    } else {
      test.equal(asyncValue, 0, "synchronously resolved")
    }
    return <div />
  }
  const resolveComponents = (media, cb) => {
    test.deepEqual(media, initialMedia, "receives media correctly")
    setTimeout(() => {
      cb({
        asyncValue: 1
      })
    }, 100)
    return {
      asyncValue: 0,
    }
  }
  const initialMedia = { foo: "bar" }
  const ResponsiveDummy = matchMedia(resolveComponents)(Dummy)
  renderToStaticMarkup(
    <MediaProvider initialMedia={initialMedia}>
      <ResponsiveDummy />
    </MediaProvider>
  )
})
