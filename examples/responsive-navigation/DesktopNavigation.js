import React from "react"
import { createStyleSheet, rem, join } from "stile"

const DesktopNavigation = ({ items }) => (
  <div>
    {items.map(({ label, href }, index) =>
      <a style={styles.item} href={href} key={index}>
        {label}
      </a>
    )}
  </div>
)

const styles = createStyleSheet({
  item: {
    padding: join(rem(.25), rem(.5)),
    textDecoration: "none",
    color: "#333",
  },
})

export default DesktopNavigation
