import createMediaQueryListener from "../createMediaQueryListener"
import { createMockWithHook } from "./mocks/matchMediaMock"

tape("createMediaQueryListener", (test) => {
  test.plan(2)
  const originalMatchMedia = window.matchMedia
  const mql = []
  window.matchMedia = createMockWithHook((item) => mql.push(item))
  const mediaQueries = {
    medium: "(min-width: 450px)",
    large: "(min-width: 750px)",
  }
  const mediaQueryListener = createMediaQueryListener(mediaQueries)
  test.equal(typeof mediaQueryListener, "function", "returns a function")
  const teardown = mediaQueryListener(() => {
    test.pass("calls update on change")
  })
  mql[0].simulateChange()
  teardown()
  mql[0].simulateChange()
  window.matchMedia = originalMatchMedia
})
