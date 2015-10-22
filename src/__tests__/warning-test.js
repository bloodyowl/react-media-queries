import warning from "../warning"

const skip = process.env.NODE_ENV === "production"

tape("warning should not react if condition is true", { skip }, (test) => {
  const originalConsoleError = console.error
  console.error = () => test.fail()
  warning(true, "should not")
  test.pass("ok")
  test.end()
  console.error = originalConsoleError
})

tape("warning should react if condition is false", { skip }, (test) => {
  const originalConsoleError = console.error
  console.error = () => test.pass()
  warning(false, "should")
  test.end()
  console.error = originalConsoleError
})

tape("warning should replace %s segments and prefix", { skip }, (test) => {
  const originalConsoleError = console.error
  console.error = (message) => {
    test.equal(message, "react-media-queries : should replace")
  }
  warning(false, "should %s", "replace")
  test.end()
  console.error = originalConsoleError
})
