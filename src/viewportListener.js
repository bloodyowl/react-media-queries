const viewportListener = (update) => {
  window.addEventListener("resize", update)
  return () => window.removeEventListener("resize", update)
}

export default viewportListener
