import composeListeners from "../composeListeners"

tape("composeListeners", (test) => {
  test.plan(4)
  const pass = () => test.pass()
  const setup = composeListeners(
    () => {
      pass()
      return pass
    },
    () => {
      pass()
      return pass
    }
  )
  const teardown = setup()
  teardown()
})
