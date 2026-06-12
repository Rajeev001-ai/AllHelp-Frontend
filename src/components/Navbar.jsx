function Navbar({ onAuthClick }) {
  return (
    <header className="navbar">
      <a className="brand" href="#top" aria-label="AllHelp home">
        <span className="brand-mark">A</span>
        <span>AllHelp</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#process">How it works</a>
        <a href="#workers">Workers</a>
      </nav>

      <div className="nav-actions">
        <button className="text-link nav-button" type="button" onClick={onAuthClick}>Login</button>
        <button className="button button-small" type="button" onClick={onAuthClick}>Signup</button>
      </div>
    </header>
  )
}

export default Navbar
