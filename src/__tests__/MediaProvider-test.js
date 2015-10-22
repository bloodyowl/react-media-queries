import React, { Component, PropTypes } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { render, unmountComponentAtNode } from "react-dom"
import { renderIntoDocument } from "react-test-utils"

import MediaProvider from "../MediaProvider"
import matchMedia from "../matchMedia"

tape("MediaProvider handles initialMedia", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = ({ testProp }) => (
    <div>{testProp}</div>
  )
  const ResponsiveDummy = matchMedia()(Dummy)
  test.equal(
    renderToStaticMarkup(
      <MediaProvider initialMedia={initialMedia}>
        <ResponsiveDummy />
      </MediaProvider>
    ),
    `<div>${ initialMedia.testProp }</div>`,
    "passes initial mediaQuery correctly"
  )
  test.end()
})


tape("MediaProvider throws if having no children", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  test.throws(() => {
    renderToStaticMarkup(
      <MediaProvider initialMedia={initialMedia} />
    )
  })
  test.end()
})

tape("MediaProvider throws if having more than one children", (test) => {
  const initialMedia = {
    testProp: "FOO_BAR",
  }
  const Dummy = ({ testProp }) => (
    <div>{testProp}</div>
  )
  const ResponsiveDummy = matchMedia()(Dummy)
  test.throws(() => {
    renderToStaticMarkup(
      <MediaProvider initialMedia={initialMedia}>
        <ResponsiveDummy />
        <ResponsiveDummy />
      </MediaProvider>
    )
  })
  test.end()
})

tape("MediaProvider handles media getting", (test) => {
  const media = {
    testProp: "TEST_PROP",
  }
  const getMedia = () => media
  const Dummy = ({ testProp }) => (
    <div>{testProp}</div>
  )
  const ResponsiveDummy = matchMedia()(Dummy)
  test.equal(
    renderToStaticMarkup(
      <MediaProvider getMedia={getMedia}>
        <ResponsiveDummy />
      </MediaProvider>
    ),
    `<div>${ media.testProp }</div>`,
    "passes mediaQuery from getMedia correctly"
  )
  test.end()
})

tape("MediaProvider prefers initialMedia to getMedia on mount", (test) => {
  const initialMedia = {
    testProp: "RIGHT",
  }
  const getMedia = () => ({
    testProp: "WRONG",
  })
  const Dummy = ({ testProp }) => (
    <div>{testProp}</div>
  )
  const ResponsiveDummy = matchMedia()(Dummy)
  test.equal(
    renderToStaticMarkup(
      <MediaProvider
        initialMedia={initialMedia}
        getMedia={getMedia}>
        <ResponsiveDummy />
      </MediaProvider>
    ),
    `<div>${ initialMedia.testProp }</div>`,
    "passes initialMedia on mount if available"
  )
  test.end()
})

tape("MediaProvider updates from listener", (test) => {
  let TEST_PROP = 0
  const getMedia = () => ({
    testProp: TEST_PROP,
  })
  let update = null

  @matchMedia()
  class Dummy extends Component {
    componentDidMount() {
      const { testProp } = this.props
      test.equal(testProp, 0, "gets media on mount")
      // delays so that parent componentDidMount are called
      setTimeout(() => {
        TEST_PROP = 1
        update()
      })
    }
    componentWillReceiveProps(props) {
      const { testProp } = props
      test.equal(testProp, 1, "updates correctly")
      setTimeout(() => {
        unmountComponentAtNode(mountNode)
      })
    }
    render() {
      const { testProp } = this.props
      return (
        <div>{testProp}</div>
      )
    }
  }

  const listener = (u) => {
    update = u
    return () => {
      test.pass("teardown is called on unmount")
      test.end()
    }
  }

  const mountNode = document.createElement("div")

  render(
    <MediaProvider
      getMedia={getMedia}
      listener={listener}>
      <Dummy />
    </MediaProvider>,
    mountNode
  )
})
