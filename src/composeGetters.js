const composeGetters = (...getters) => {
  return () => getters.reduce(
    (acc, func) => {
      return {
        ...acc,
        ...func()
      }
    },
    {}
  )
}

export default composeGetters
