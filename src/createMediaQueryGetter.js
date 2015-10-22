const createMediaQueryGetter = (mediaQueries) => () => {
  const mediaQuery = Object.keys(mediaQueries).reduce((results, alias) => {
    const mql = window.matchMedia(mediaQueries[alias])
    const { matches, media } = mql
    results[alias] = { matches, media }
    return results
  }, {})

  return { mediaQuery }
}

export default createMediaQueryGetter
