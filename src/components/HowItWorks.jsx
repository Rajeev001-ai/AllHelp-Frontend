import { workflowSteps } from '../data/landingData'

function HowItWorks() {
  return (
    <section className="section process-section" id="process">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>Human-reviewed assignment before every job.</h2>
        <p>AllHelp keeps the early platform controlled: users request, admin verifies, workers are assigned by location.</p>
      </div>

      <div className="process-list">
        {workflowSteps.map((step) => (
          <article className="process-item" key={step.label}>
            <span>{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
