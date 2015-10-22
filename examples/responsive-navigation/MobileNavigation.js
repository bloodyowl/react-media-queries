import React, { Component } from "react"
import { createStyleSheet, rem, vw } from "stile"

class MobileNavigation extends Component {

  state = {
    opened: false,
  }

  render() {
    const { items } = this.props
    const { opened } = this.state
    return (
      <div>
        <button
          style={styles.button}
          onClick={() => this.setState({ opened: true })}>
          {hamburger}
        </button>
        {opened &&
          <div>
            <div
              style={styles.overlay}
              onClick={() => this.setState({ opened: false })}/>
            <div style={styles.navigation}>
              {items.map(({ label, href }, index) =>
                <a style={styles.item} href={href} key={index}>
                  {label}
                </a>
              )}
            </div>
          </div>
        }
      </div>
    )
  }
}

const hamburger = (
  <svg viewBox="0 0 15 15" width={15} height={15}>
    <rect x={0} y={0} width={15} height={3} />
    <rect x={0} y={6} width={15} height={3} />
    <rect x={0} y={12} width={15} height={3} />
  </svg>
)

const styles = createStyleSheet ({
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "rgba(0,0,0,.6)",
    cursor: "pointer",
  },
  navigation: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    background: "#fff",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    minWidth: vw(70),
  },
  item: {
    padding: rem(1),
    textDecoration: "none",
    borderBottom: "1px solid #eee",
    color: "#888",
  },
})

export default MobileNavigation
