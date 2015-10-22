import viewportListener from "../viewportListener"

tape("viewportListener", (test) => {
  const originalAddEventListener = window.addEventListener
  const originalRemoveEventListener = window.removeEventListener
  let passedListener
  window.addEventListener = (type, listener) => {
    test.equal(type, "resize")
    test.equal(typeof listener, "function")
    passedListener = listener
  }
  window.removeEventListener = (type, listener) => {
    test.equal(type, "resize")
    test.equal(listener, passedListener)
    test.end()
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
  }
  const teardown = viewportListener(() => {})
  teardown()
})
