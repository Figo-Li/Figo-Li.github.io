import { siteConfig } from "../config/site";
import { profile } from "../content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>{profile.name}</p>
      <p>
        Designed and built by me for{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a>.
      </p>
    </footer>
  );
}
