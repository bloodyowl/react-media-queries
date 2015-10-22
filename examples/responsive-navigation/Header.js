import React from "react"
import { matchMedia } from "../../src"
import navigationItems from "./navigationItems"
import { createStyleSheet, percent, rem } from "stile"

const Header = ({ Navigation }) => (
  <div style={styles.header}>
    <div style={styles.title}>hey there</div>
    <div style={styles.navigation}>
      {Navigation && <Navigation items={navigationItems}/>}
    </div>
  </div>
)

const styles = createStyleSheet({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: rem(1),
    background: "linear-gradient(to bottom, #fff, #eee)",
  },
  title: {
    flexShrink: 1,
    flexBasis: percent(50),
  },
})

const resolveComponents = ({ mediaQuery }, cb) => {
  if(mediaQuery.maxL.matches) {
    require.ensure([], () => {
      cb({
        Navigation: require("./MobileNavigation"),
      })
    })
  } else {
    require.ensure([], () => {
      cb({
        Navigation: require("./DesktopNavigation"),
      })
    })
  }
}

export default matchMedia(resolveComponents)(Header)
