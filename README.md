# Nidhal Baghdadi · Portfolio

A portfolio you can walk through: an ink-drawn arena floating in a glass globe in space, where each station holds part of the story (about, projects, skills, experience, contact). The same content is available as a plain page, which is where visitors who prefer reduced motion start.

## Stack

- **Vite + React 19 + TypeScript**, routed with React Router
- **React Three Fiber + drei** for the 3D scene (three.js), loaded as its own chunk only when shown
- **GSAP** (SplitText, ScrollTrigger) for text motion, off under `prefers-reduced-motion`
- **CSS Modules** with design tokens in `src/styles/tokens.css`
- **Netlify** hosting, with a **Netlify Function** sending the contact form through **Resend**

## Getting started

```sh
npm install
npm run dev          # the site on http://localhost:3001 (without the contact function)
npx netlify dev      # the site and the contact function together
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | type-check, then build to `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
| `npm test` | unit tests (Vitest) |

## Environment variables

Set these in Netlify (Site configuration → Environment variables); locally, in a `.env` file read by `netlify dev`.

| Variable | Needed for | Notes |
|---|---|---|
| `RESEND_API_KEY` | contact form | server-side only, never exposed to the browser |
| `CONTACT_TO` | contact form | the inbox messages go to |
| `CONTACT_FROM` | contact form (optional) | a sender on a domain verified in Resend; without it, Resend's test sender only delivers to the account owner |

The site's public address for social previews comes from Netlify's own `URL` at build time.

## Where things are

```
src/
  content/     every word on the site, typed (StationContent); the CV in public/CV is the source
  scene/       3D world: stations, props, camera, ink materials, the persistent canvas
  components/  station text, panel, map, 3D pieces (PropModel, Tiles, Island, Space, Marker)
  pages/       arena and page modes, case studies, credits
  contact/     form validation shared by the browser and the function
  lib/motion   GSAP setup
netlify/functions/contact.ts   the contact form's server side
public/models/arena            3D models (see CREDITS.md)
```

Changing content: edit `src/content/*.ts`. The 3D props follow the content where it makes sense (one plinth per project, one statue per recent job).

## Credits

3D models by Kenney, dook, J-Toastie and Quaternius: see [CREDITS.md](CREDITS.md) and `/credits` on the site.
