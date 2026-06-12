function WorkerNetwork() {
  return (
    <section className="section worker-section" id="workers">
      <div className="worker-copy">
        <p className="eyebrow">Worker network</p>
        <h2>Grow a local service network with controlled assignments.</h2>
        <p>
          Workers can be added with their skills, service areas, and availability. Admins can then assign jobs confidently instead of managing everything manually.
        </p>
      </div>

      <div className="ops-preview" aria-label="Admin assignment preview">
        <div className="ops-header">
          <span>Admin Queue</span>
          <strong>4 pending</strong>
        </div>
        <div className="ops-row">
          <span>Plumbing request</span>
          <strong>2.4 km</strong>
        </div>
        <div className="ops-row active">
          <span>Electrical repair</span>
          <strong>Assign Raj</strong>
        </div>
        <div className="ops-row">
          <span>AC service</span>
          <strong>5.1 km</strong>
        </div>
        <div className="dispatch-note">
          <span className="status-dot"></span>
          <p>Best match selected by area, skill, and availability.</p>
        </div>
      </div>
    </section>
  )
}

export default WorkerNetwork
