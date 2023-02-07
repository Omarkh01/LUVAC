import React from "react";

function NavigationBar() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <a style={styles.a} href="/movies">Movies</a>
        </li>
        <li style={styles.li}>
          <a style={styles.a} href="/newrentals">New Rentals</a>
        </li>
        <li style={styles.li}>
          <a style={styles.a} href="/customers">Customers</a>
        </li>
      </ul>
      <button onClick={() => {
        window.localStorage.clear();
        window.location.href = '/';
      }} className="btn btn-outline-dark">Logout</button>
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
  },  
  a: {
    display: "inline-block",
    width: "100%",
    height: "100%",
    color: "black",
  },
};

export default NavigationBar;
