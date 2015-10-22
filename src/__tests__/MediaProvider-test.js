import React, { Component, PropTypes } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { renderIntoDocument } from "react-test-utils"

import MediaProvider from "../MediaProvider"
import matchMedia from "../matchMedia"

tape("MediaProvider can handle server-side", (test) => {

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
