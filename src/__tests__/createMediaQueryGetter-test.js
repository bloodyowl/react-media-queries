import createMediaQueryGetter from "../createMediaQueryGetter"
import matchMediaMock from "./mocks/matchMediaMock"

tape("createMediaQueryGetter", (test) => {
  const originalMatchMedia = window.matchMedia
  window.matchMedia = matchMediaMock
  const mediaQueries = {
    medium: "(min-width: 450px)",
    large: "(min-width: 750px)",
  }
  const mediaQueryGetter = createMediaQueryGetter(mediaQueries)
  test.equal(typeof mediaQueryGetter, "function", "returns a function")
  test.deepEqual(
    mediaQueryGetter(),
    {
      mediaQuery: {
        medium: { media: mediaQueries.medium, matches: true },
        large: { media: mediaQueries.large, matches: true },
      },
    },
  )
  test.end()
  window.matchMedia = originalMatchMedia
})
