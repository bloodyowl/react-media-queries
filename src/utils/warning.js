var warning = () => {}

if(
  process.env.NODE_ENV !== "production" &&
  window.console &&
  window.console.error
) {
  warning = function(condition, message, ...args) {
    if(condition) {
      return
    }
    let index = -1
    const warningMessage = message.replace(/%s/g, () => args[++index])
    console.error("react-media-queries : " + warningMessage)
  }
}

export default warning
