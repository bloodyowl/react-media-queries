const composeListeners = (...listeners) => {
  return (a) => listeners.reduce(
    (acc, func) => {
      const value = func(a)
      return (b) => {
        acc(b)
        value(b)
      }
    },
    () => {}
  )
}

export default composeListeners
