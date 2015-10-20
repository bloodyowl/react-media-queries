import React, { Component, PropTypes, Children } from "react"

const noop = () => {}

class MediaProvider extends Component {
  static propTypes = {
    initialMedia: PropTypes.object,
    getMedia: PropTypes.func.isRequired,
    listener: PropTypes.func,
  }
  static defaultProps = {
    listener: noop,
  }
  static childContextTypes = {
    mediaQuery: PropTypes.object.isRequired,
  }
  state = {}
  componentWillMount() {
    const { initialMedia, getMedia } = this.props
    this.setState({
      mediaQuery: initialMedia || getMedia(),
    })
  }
  componentDidMount() {
    const { listener, getMedia } = this.props
    if(!listener) {
      return
    }
    this.removeListener = listener(() =>
      this.setState({
        mediaQuery: getMedia()
      })
    )
  }
  componentWillUnmount() {
    if(!this.removeListener) {
      return
    }
    this.removeListener()
    this.removeListener = null
  }
  getChildContext() {
    const { mediaQuery } = this.state
    return { mediaQuery }
  }
  render() {
    const { children } = this.props
    return Children.only(children)
  }
}

export default MediaProvider
