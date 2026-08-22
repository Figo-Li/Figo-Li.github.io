# Content Audit

Date: 2026-08-22

## User Request Handling

The pasted text is treated as the user request. The resume PDF and public profiles are treated as source material only.

## Sources Inspected

- Resume PDF: `C:\Users\figo7\Downloads\RenderCV_EngineeringResumes_Theme.pdf`
- GitHub profile: `https://github.com/Figo-Li`
- Public GitHub repository metadata through the GitHub API
- Public LinkedIn search result for `https://www.linkedin.com/in/yunze/`
- Public repositories cloned into a temporary research directory:
  - `Figo-Li/Hammerly`
  - `Figo-Li/gin-rummy-twist`
  - `Figo-Li/unemployment-rate-predict-model`
  - `Figo-Li/reddit-comments-analysis`
  - `Figo-Li/reddit-comments-analysis-model`

## Repository Review Summary

### Hammerly

Selected as a featured full-stack project because public source verifies a Vite/React frontend, Express/TypeScript backend, SQLite persistence, JWT auth, Swagger documentation, and auction workflows for search, bidding, watchlists, and auction management.

### Gin Rummy, With a Twist

Selected as a featured software project because the public repository verifies a custom game UI, room creation/join flow, Flask match endpoints, card state, dozenal card logic, assets, and frontend tests.

The repository homepage lists `https://ginrummys.ca`, but a direct HTTP check returned `500 Internal Server Error`, so the portfolio does not show it as a verified live demo.

### Lychee Nutrition App

Included from the resume because it is directly relevant to data engineering and RAG work. A public repository was not visible in the GitHub profile, so the portfolio clearly avoids a repository link and notes that implementation details are resume-verified only.

### Unemployment Rate Prediction Model

Selected as a data/ML project because public source verifies Statistics Canada data, preprocessing scripts, LSTM and linear regression model training, saved artifacts, and project methodology documentation.

### Reddit Comments Analysis

Included as a secondary data/NLP project because public source verifies Reddit/PRAW collection, annotation splitting, paired model repository, train/validation/test data, and baseline model results.

## Verified Resume Facts Used

- Name: Yunze (Figo) Li
- Location: Kitchener, Ontario, Canada
- Email: `figoli925@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/yunze/`
- GitHub: `https://github.com/Figo-Li`
- University of Waterloo MEng in Electrical and Computer Engineering, September 2025 - December 2026, GPA 3.9 / 4.0
- McMaster University BASc Honours Computer Science Co-op, September 2020 - June 2025, Minor in Probability and Statistics for Engineering, GPA 3.7 / 4.0
- Redmesh and Beijing Olym Tiancheng Technology experience, including the resume metrics
- Resume skill list

## Conflicts and Unresolved Items

- The supplied resume PDF contains a phone number. Version 1 does not copy it into public assets to avoid publishing that number.
- LinkedIn public access did not reliably expose the requested `/in/yunze/` profile. The resume is used as source of truth and the LinkedIn URL remains an external link.
- Public GitHub metadata shows `Figo-Li/Figo-Li.github.io` returning `404`, so no existing public user-site repository was visible during inspection.
- `gin-rummy-twist` resume text mentions Spring Boot, PostgreSQL, WebSockets, and Google Cloud deployment. The public cloned source verifies Next.js, Redux, Flask, Python, room endpoints, and tests. The portfolio uses the public source wording and avoids unverified Spring Boot/WebSocket claims for that project.
- `gin-rummy-twist` README mentions PostgreSQL and GCP, but the cloned backend source does not show database integration. The live domain returned HTTP 500.
- Lychee Nutrition App was not found in the visible public GitHub repositories.

## Version 2 Recommendations

- Add a redacted public resume PDF and link the Resume button directly to `public/Yunze_Li_Resume.pdf`.
- Add screenshots or short screen recordings for Hammerly, Gin Rummy, and Lychee once public-safe assets are available.
- Publish or link the Lychee repository, or add a short architecture document so project implementation claims can be verified from source.
