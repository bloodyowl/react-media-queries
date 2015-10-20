import createConnector from "./createConnector"

const matchMedia = (resolveComponents, mergeProps) => (ComposedComponent) =>
  createConnector(ComposedComponent, resolveComponents, mergeProps)

export default matchMedia
