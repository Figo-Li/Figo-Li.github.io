# Yunze (Figo) Li Portfolio

Static personal portfolio for Yunze (Figo) Li, built for `https://figo-li.github.io/`.

## Technology Stack

- React, TypeScript, and Vite
- Modern CSS with responsive layout and reduced-motion support
- Lucide icons
- Vitest and Testing Library
- ESLint, Prettier, and TypeScript checks
- GitHub Actions workflow for GitHub Pages deployment

## Local Setup

```bash
pnpm install
pnpm dev
```

## Commands

```bash
pnpm lint
pnpm type-check
pnpm test
pnpm format
pnpm build
pnpm preview
```

## Deployment

This is configured as a GitHub user site for `Figo-Li/Figo-Li.github.io`, with Vite `base: "/"`.

The `.github/workflows/deploy.yml` workflow installs dependencies, runs formatting, linting, type checks, tests, builds the static site, and deploys the `dist` artifact to GitHub Pages.

Manual deployment flow after the repository exists:

```bash
git remote add origin https://github.com/Figo-Li/Figo-Li.github.io.git
git push -u origin main
```

Then enable Pages with GitHub Actions as the source in repository settings if it is not already enabled.

## Updating Personal Information

Core profile and site configuration are separated from UI components:

- `src/config/site.ts` - canonical URL, public links, email, navigation, and career-lens copy
- `src/content/profile.ts` - headline, location, summary, and resume status
- `src/content/experience.ts` - professional experience
- `src/content/projects.ts` - project cards and case studies
- `src/content/skills.ts` - grouped skills and career-lens emphasis

## Adding or Editing Projects

Edit `src/content/projects.ts`. Each project includes:

- One-sentence description
- Role or contribution
- Technology tags
- Verified highlights
- Case-study fields
- Source verification notes
- Optional repository and demo links

Use repository source or resume evidence before adding claims.

## Replacing the Resume

The supplied PDF includes a phone number, so it is not copied into `public/` in Version 1.

To publish a public resume later:

1. Create a redacted public PDF.
2. Save it as `public/Yunze_Li_Resume.pdf`.
3. Update `src/content/profile.ts` and `src/components/ResumeNotice.tsx` to link directly to the PDF.
4. Re-run checks before publishing.

## Custom Domain

The canonical site URL lives in `src/config/site.ts`.

To add a custom domain later:

1. Add a `public/CNAME` file containing the domain.
2. Update `siteConfig.url`.
3. Configure DNS with the domain provider.
4. Update GitHub Pages settings after deployment.

## Current Public URL

Target URL: `https://figo-li.github.io/`

Deployment may require GitHub authentication and repository creation if `Figo-Li/Figo-Li.github.io` does not exist yet.
