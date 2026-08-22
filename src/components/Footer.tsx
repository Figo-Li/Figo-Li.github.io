import { siteConfig } from "../config/site";
import { profile } from "../content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>{profile.name}</p>
      <p>
        Built as a static React portfolio for{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a>.
      </p>
    </footer>
  );
}
