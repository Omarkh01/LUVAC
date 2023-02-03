import React from "react";

function NavigationBar() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <a href="/">Tab 1</a>
        </li>
        <li style={styles.li}>
          <a href="/movies">Tab 2</a>
        </li>
        <li style={styles.li}>
          <a href="/newrentals">Tab 3</a>
        </li>
        <li style={styles.li}>
          <a href="/customers">Tab 4</a>
        </li>
      </ul>
      <button>Login</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
  },
  ul: {
    display: "flex",
  },
  li: {
    listStyle: "none",
    marginRight: "1rem",
    color: "black",
  }
};

export default NavigationBar;
