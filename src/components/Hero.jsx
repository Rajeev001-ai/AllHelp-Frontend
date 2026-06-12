import heroImage from '../assets/allhelp-hero.png'

function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Local service platform</p>
        <h1>One request. The right nearby worker.</h1>
        <p className="hero-text">
          AllHelp helps customers book home services while your admin team controls quality, verifies requests, and assigns workers by location.
        </p>
        <div className="hero-actions" id="request">
          <a className="button" href="#services">Explore services</a>
          <a className="button button-secondary" href="#process">How assignment works</a>
        </div>
        <div className="hero-proof" aria-label="Platform highlights">
          <span>Verified workers</span>
          <span>Admin reviewed</span>
          <span>Area matched</span>
        </div>
      </div>

      <div className="hero-product" aria-label="AllHelp platform preview">
        <div className="hero-photo">
          <img src={heroImage} alt="A verified home service worker assisting a customer at their home" />
        </div>
        <div className="dashboard-card">
          <div className="dashboard-top">
            <span>Admin dashboard</span>
            <strong>Live</strong>
          </div>
          <div className="ticket-card active">
            <div>
              <span>Electrical repair</span>
              <strong>Sector 18</strong>
            </div>
            <small>Assign Raj</small>
          </div>
          <div className="ticket-card">
            <div>
              <span>Plumbing request</span>
              <strong>DLF Phase 2</strong>
            </div>
            <small>2.4 km</small>
          </div>
          <div className="mini-stats">
            <div>
              <strong>12</strong>
              <span>Workers online</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Jobs assigned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
