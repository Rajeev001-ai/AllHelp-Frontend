import { serviceCategories } from '../data/landingData'

function ServiceCategories() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>One platform for everyday home work.</h2>
        <p>Start with the essential services customers ask for most, then expand city by city.</p>
      </div>

      <div className="service-grid">
        {serviceCategories.map((service, index) => (
          <article className="service-card" key={service.title} style={{ '--delay': `${index * 90}ms` }}>
            <div className="service-icon" aria-hidden="true">{service.icon}</div>
            <div>
              <span>{service.signal}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServiceCategories
