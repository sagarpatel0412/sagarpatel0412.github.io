# Developer portfolio (React + Vite)

A responsive single-page portfolio with hero, about, filterable featured projects, a live GitHub profile and public repository grid, and contact links.

## Run

```bash
npm install
cp .env.example .env
# On Windows PowerShell: Copy-Item .env.example .env
# Edit .env with your real GitHub username
npm run dev
```

Open the local address Vite prints (normally http://localhost:5173).

## Customize

- `src/data.js`: display name, profile text, skills, featured projects, external URLs, email.
- `.env`: `VITE_GITHUB_USERNAME=your-real-github-username`.
- `src/styles.css`: colors/layout.
- Put a resume PDF in `public/resume.pdf`, then set `profile.resumeUrl = '/resume.pdf'`.
- Set actual `demoUrl` and `githubUrl` for each featured project. Empty URLs hide the buttons.

## GitHub

This project fetches public user data from `GET /users/{username}` and owned public repositories from `GET /users/{username}/repos?sort=updated&per_page=100&type=owner` and displays up to 18 non-fork repositories. Public GitHub API requests are subject to unauthenticated rate limits, so a public deployment with high traffic may need a caching server/API proxy. Do not put a GitHub access token in Vite environment variables: `VITE_*` values are exposed to the browser.

The design does **not** invent a contribution heatmap or pretend repository statistics are available when requests fail. Private repositories are excluded by the public API. The featured project text is starter content to review and customize, not verified case studies.

## Build

```bash
npm run build
```

Deploy `dist` to Vercel, Netlify, Cloudflare Pages, or similar static hosting.
