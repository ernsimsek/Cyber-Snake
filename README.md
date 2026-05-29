# Cyber Snake

A modern, cyberpunk-themed Snake game built with **Next.js**, **TypeScript**, and the **Canvas API**. Play in the browser with neon visuals, particle effects, combo scoring, and a full HUD — on desktop or mobile.

> Türkçe: Klasik yılan oyununun neon/cyberpunk temalı, tarayıcıda çalışan bir versiyonu. Kurulum ve yayınlama adımları aşağıda.

---

## Preview

<!-- Replace with your own screenshot after pushing to GitHub -->
<!-- ![Cyber Snake gameplay](./docs/screenshot.png) -->

Add a screenshot to `docs/screenshot.png` and uncomment the line above for a nicer repo page.

**Live demo:** _Deploy to Vercel and paste your URL here._

---

## Features

| Category | Details |
|----------|---------|
| **Gameplay** | Classic Snake on a 30×20 grid, smooth game loop, dynamic speed by level |
| **Scoring** | Combos, multipliers, bonus & golden food, level progression |
| **Visuals** | Canvas rendering, particles, glow effects, screen shake, cinematic boot sequence |
| **UI** | Glassmorphism HUD, pause / game over overlays, optional external minimap |
| **Themes** | Cyber, Neon, Matrix, Void |
| **Difficulty** | Easy, Normal, Hard, Insane |
| **Audio** | Procedural sound effects via Web Audio API (toggle in settings) |
| **Input** | Keyboard (arrows / WASD) on desktop, swipe on mobile |
| **Leaderboard** | Top scores tracked during the session |

---

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand.docs.pmnd.rs/) — game state
- **Canvas API** — rendering
- **Web Audio API** — synthesized SFX

---

## Requirements

- **Node.js** 18.18 or newer (20+ recommended)
- **npm** 9+ (or pnpm / yarn)

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/cyber-snake.git
cd cyber-snake
```

### 2. Install dependencies

```bash
npm install
```

If you see network errors (`ECONNRESET`), retry the command or increase the timeout:

```bash
npm config set fetch-timeout 300000
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | `↑` `↓` `←` `→` or **W A S D** | Swipe on the game area |
| Pause / resume | `Space` or `Esc` | Pause button in UI |
| Restart (game over) | `Space` or `Enter` | Tap restart in overlay |
| Menu navigation | Mouse / tap | Tap |

---

## Settings

Open **Settings** from the main menu:

- Sound effects & music
- Difficulty (Easy → Insane)
- Visual theme
- Particles & glow
- Minimap on/off (shown outside the playfield so it does not block the snake)

---

## Project structure

```
cyber-snake/
├── app/                 # Next.js app router (layout, page, styles)
├── components/          # UI: menu, HUD, overlays, minimap
├── game/                # Engine, renderer, constants
├── hooks/               # Game loop, keyboard, swipe, sound
├── lib/                 # Particles, audio, utilities
├── store/               # Zustand game & UI state
└── types/               # Shared TypeScript types
```

---

## Deploy to GitHub & Vercel

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Cyber Snake"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cyber-snake.git
git push -u origin main
```

Create the empty repository on GitHub first, then replace `YOUR_USERNAME` with your account name.

### Deploy on Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → import `cyber-snake`.
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy**.

No extra environment variables are required for a standard deployment.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Roadmap ideas

- [ ] Persist leaderboard & high score in `localStorage`
- [ ] Upgrade Next.js to latest patched release
- [ ] PWA / installable web app
- [ ] Touch-friendly on-screen D-pad

---

## License

This project is open source. Add an [MIT License](https://choosealicense.com/licenses/mit/) file if you want others to use it freely with attribution.

---

## Author

**Your Name** — replace with your GitHub profile link after publishing.

If this project helped you, consider giving the repo a star on GitHub.
