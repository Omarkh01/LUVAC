import './style.css'

function NavigationBar() {
  return (
    <nav className="nav-bar">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="/movies" className="nav-link">
            Movies
          </a>
        </li>
        <li className="nav-item">
          <a href="/newrentals" className="nav-link">
            New Rentals
          </a>
        </li>
        <li className="nav-item">
          <a href="/customers" className="nav-link">
            Customers
          </a>
        </li>
      </ul>
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.href = "/";
        }}
        className="btn btn-outline-dark"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavigationBar;
