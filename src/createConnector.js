import React, { Component, PropTypes } from "react"
import warning from "./utils/warning"
import getCollidingKey from "./utils/getCollidingKey"

const defaultMergeProps = (ownProps, mediaProps, componentProps) => {
  if(process.env.NODE_ENV !== "production") {
    let key = getCollidingKey(ownProps, mediaProps, componentProps)
    if(key) {
      warning(
        true,
        "colliding key %s in props merge",
        key
      )
    }
  }
  return {
    ...ownProps,
    ...mediaProps,
    ...componentProps,
  }
}

const defaultResolveComponents = () => null

const createConnector = (
  ComposedComponent,
  resolveComponents = defaultResolveComponents,
  mergeProps = defaultMergeProps
) => {
  class MatchMedia extends Component {
    static contextTypes = {
      mediaQuery: PropTypes.object,
    }
    componentWillMount() {
      this.mediaQuery = this.context.mediaQuery
      this.resolveComponents()
    }
    componentDidUpdate() {
      if(this.context.mediaQuery !== this.mediaQuery) {
        this.resolveComponents()
        this.mediaQuery = this.context.mediaQuery
      }
    }
    resolveComponents() {
      const callback = (components) => this.setState({ ...components })
      const syncResolved = resolveComponents(this.context.mediaQuery, callback)
      if(typeof syncResolved === "object") {
        this.setState({ ...syncResolved })
      }
    }
    render() {
      const { mediaQuery } = this.context
      return (
        <ComposedComponent
          {...mergeProps(this.props, mediaQuery, this.state)} />
      )
    }
  }
  return MatchMedia
}

export default createConnector
