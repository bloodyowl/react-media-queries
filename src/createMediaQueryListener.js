const createMediaQueryListener = (mediaQueries) => (update) => {
  const mqlList = Object.keys(mediaQueries).map((alias) => {
    const mql = window.matchMedia(mediaQueries[alias])
    mql.addListener(update)
    return mql
  })

  return () =>  mqlList.forEach((mql) => mql.removeListener(update))
}

export default createMediaQueryListener
