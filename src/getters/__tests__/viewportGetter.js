import viewportGetter from "../viewportGetter"

tape("viewportGetter", (test) => {
  test.equal(
    Object.keys(viewportGetter()).length,
    2
  )
  test.equal(
    typeof viewportGetter().viewportWidth,
    "number"
  )
  test.equal(
    typeof viewportGetter().viewportHeight,
    "number"
  )
  test.end()
})
