# Yashakshi Birthday Surprise

## Overview

This is a single-page, interactive birthday experience built with TanStack Start and React. Visitors move through a deliberate sequence: greeting, yes/no prompt, lights, music, decorations, balloons, cake cutting, and a final auto-scrolling letter.

## Architecture

- `src/routes/index.tsx` contains the complete experience, interaction state, birthday letter, audio controls, and animation triggers.
- `src/routes/__root.tsx` defines document metadata and loads the global stylesheet.
- `src/styles.css` contains the visual system, responsive layout, and all CSS animations.
- `public/audio/birthday-piano.mp3` is the uploaded piano track used after the visitor presses Play Music.
- `netlify.toml` contains the Netlify build and deployment settings.

## Conventions

- Keep this experience client-side; it does not require authentication, forms, APIs, or persistent storage.
- Use React hooks for local interaction state.
- Keep visible copy in `src/routes/index.tsx` so the personalized text is easy to update.
- Preserve the numbered story sequence when adding or changing screens.
- Prefer CSS transforms and opacity for animation performance.
- Keep controls keyboard accessible and include reduced-motion handling for decorative animation.

## Local Development

Use `pnpm dev` for local development and `pnpm build` for a production build. Netlify handles the deployed build using the repository configuration.
