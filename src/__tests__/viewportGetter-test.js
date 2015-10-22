import viewportGetter from "../viewportGetter"

tape("viewportGetter", (test) => {
  test.equal(
    Object.keys(viewportGetter()).length,
    1
  )
  test.equal(
    Object.keys(viewportGetter().viewport).length,
    2
  )
  test.equal(
    typeof viewportGetter().viewport.width,
    "number"
  )
  test.equal(
    typeof viewportGetter().viewport.height,
    "number"
  )
  test.end()
})
