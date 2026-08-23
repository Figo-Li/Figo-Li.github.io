import { profile } from "../content/profile";

export function About() {
  return (
    <section
      className="page-section reveal"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-heading">
        <p className="eyebrow">ABOUT</p>
        <h2 id="about-title">
          I build reliable software from backend systems to real-time products.
        </h2>
      </div>
      <div className="about-copy">
        {profile.about.map((paragraph) => (
          <p className="section-lead" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="about-metrics" aria-label="Portfolio highlights">
        <article>
          <strong>30%</strong>
          <span>MTTR reduction through distributed-system troubleshooting</span>
        </article>
        <article>
          <strong>40%</strong>
          <span>Query-performance improvement with PySpark optimization</span>
        </article>
        <article>
          <strong>5</strong>
          <span>Verified projects spanning software, cloud, data, and NLP</span>
        </article>
      </div>
    </section>
  );
}
