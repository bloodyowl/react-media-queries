const mediaQueryGetter = (mediaQueries) => () => {
  const mediaQuery = Object.keys(mediaQueries).reduce((results, size) => {
    const mql = window.matchMedia(mediaQueries[size])
    results[size] = mql
    return results
  }, {})

  return { mediaQuery }
}

export default mediaQueryGetter
