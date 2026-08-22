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
        <article className="education-item">
          <p className="item-kicker">September 2025 - December 2026</p>
          <h3>University of Waterloo</h3>
          <p>Master of Engineering, Electrical and Computer Engineering</p>
          <p>GPA: 3.9 / 4.0</p>
        </article>
        <article className="education-item">
          <p className="item-kicker">September 2020 - June 2025</p>
          <h3>McMaster University</h3>
          <p>Bachelor of Applied Science, Honours Computer Science Co-op</p>
          <p>Minor in Probability and Statistics for Engineering</p>
          <p>GPA: 3.7 / 4.0</p>
        </article>
      </div>
    </section>
  );
}
