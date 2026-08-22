import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { siteConfig } from "./config/site";
import "./styles.css";

const setMeta = (
  name: string,
  content: string,
  attribute: "name" | "property" = "name",
) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
};

const setLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

document.title = siteConfig.title;
setMeta("description", siteConfig.description);
setMeta("og:title", siteConfig.title, "property");
setMeta("og:description", siteConfig.description, "property");
setMeta("og:type", "website", "property");
setMeta("og:url", siteConfig.url, "property");
setMeta("twitter:card", "summary");
setMeta("twitter:title", siteConfig.title);
setMeta("twitter:description", siteConfig.description);
setLink("canonical", siteConfig.url);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yunze (Figo) Li",
  alternateName: "Figo Li",
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kitchener",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  alumniOf: ["McMaster University"],
  affiliation: ["University of Waterloo"],
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.text = JSON.stringify(personJsonLd);
document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
