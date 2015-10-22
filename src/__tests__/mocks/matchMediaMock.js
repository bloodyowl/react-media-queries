const map = new Map()

class MediaQueryList {
  constructor(mediaQuery) {
    this.media = mediaQuery
    this.matches =  true
  }
  addListener(func) {
    map.set(this, (map.get(this) || []).concat(func))
  }
  removeListener(func) {
    map.set(this, (map.get(this) || []).filter((item) => item !== func))
  }
  simulateChange() {
    (map.get(this) || []).forEach((func) => func())
  }
}

const matchMediaMock = (mediaQuery) => {
  return new MediaQueryList(mediaQuery)
}

export const createMockWithHook = (onCreate) => {
  return (mediaQuery) => {
    const value = matchMediaMock(mediaQuery)
    onCreate(value)
    return value
  }
}

export default matchMediaMock
