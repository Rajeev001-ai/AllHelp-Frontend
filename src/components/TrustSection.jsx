import { trustMetrics } from '../data/landingData'

function TrustSection() {
  return (
    <section className="trust-band">
      <div className="trust-content">
        <div>
          <p className="eyebrow">Built for trust</p>
          <h2>Customers get help without guessing who to call.</h2>
        </div>
        <p>
          The platform creates a clear operating layer between customers and workers, so every request can be tracked, reviewed, and assigned with accountability.
        </p>
      </div>

      <div className="metric-row">
        {trustMetrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustSection
