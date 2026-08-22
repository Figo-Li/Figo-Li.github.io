import { profile } from "../content/profile";

export function About() {
  return (
    <section
      className="page-section reveal"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2 id="about-title">Software foundations for data-heavy systems.</h2>
      </div>
      <p className="section-lead">{profile.about}</p>
    </section>
  );
}
