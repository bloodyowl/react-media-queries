import composeGetters from "../composeGetters"

tape("composeGetters", (test) => {
  const composed = composeGetters(
    () => ({ a: 1 }),
    () => ({ b: 1 })
  )
  test.deepEqual(composed(), {a: 1, b: 1})
  test.end()
})
