const mediaQueryListener = (mediaQueries, update) => {
  const mqlList = Object.keys(mediaQueries).map(size => {
    const mql = window.matchMedia(mediaQueries[size])
    mql.addListener(update)
    return mql
  })

  return () => {
    mqlList.forEach(mql => { mql.removeListener(update) })
  }
}

export default mediaQueryListener
