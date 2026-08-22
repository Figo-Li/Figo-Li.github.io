export function Education() {
  return (
    <section
      className="page-section reveal"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Education</p>
        <h2 id="education-title">
          I pair graduate engineering study with a computer science foundation.
        </h2>
      </div>
      <div className="education-grid">
        <article className="education-item waterloo-card">
          <div className="education-heading">
            <img
              className="school-logo waterloo-logo"
              src="/images/education/waterloo-crest.svg"
              alt="University of Waterloo crest"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="item-kicker">September 2025 - December 2026</p>
              <h3>University of Waterloo</h3>
            </div>
          </div>
          <p>Master of Engineering, Electrical and Computer Engineering</p>
          <p>GPA: 3.9 / 4.0</p>
        </article>
        <article className="education-item mcmaster-card">
          <div className="education-heading">
            <img
              className="school-logo mcmaster-logo"
              src="/images/education/mcmaster-logo.svg"
              alt="McMaster University logo"
              width="156"
              height="82"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="item-kicker">September 2020 - June 2025</p>
              <h3>McMaster University</h3>
            </div>
          </div>
          <p>Bachelor of Applied Science, Honours Computer Science Co-op</p>
          <p>Minor in Probability and Statistics for Engineering</p>
          <p>GPA: 3.7 / 4.0</p>
        </article>
      </div>
    </section>
  );
}
