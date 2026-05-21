# React Snake Game

Modern browser-based Snake game built with React.

This repository is maintained as a compact portfolio project. It shows an interactive frontend application with game state, keyboard input, collision detection, persistent high-score tracking, responsive UI styling, and static deployment through GitHub Pages.

## Live Demo

```text
https://itkrivoshei.github.io/react-snake-game/
```

## Overview

The app implements the classic Snake loop in the browser:

```text
Explicit start action
  ↓
Keyboard or mobile direction input
  ↓
React state update
  ↓
Game timer tick
  ↓
Move snake → check collision → check food → update score
  ↓
Render board
```

## Tech Stack

- React
- JavaScript
- HTML
- CSS
- Browser localStorage
- GitHub Actions
- GitHub Pages

## Features

- Classic Snake gameplay
- Explicit start screen before the snake starts moving
- Start, pause, reset, and replay flow
- Keyboard controls with arrow keys
- Mobile-friendly direction pad
- Score, level, and persistent high-score tracking
- Food spawning logic that avoids the snake body
- Wall and self-collision detection
- Safer collision logic for moves into the previous tail position
- Increasing speed after eating food
- Auto-pause when the browser tab is hidden
- Responsive dark UI
- Static deployment through GitHub Pages

## Controls

| Key | Action |
| --- | --- |
| `Arrow keys` | Move snake |
| `Space` | Start or pause game |

On mobile-sized screens, the app also displays direction buttons.

## Project Structure

```text
.
├── docs/
├── react-snake/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── Food.js
│   │   ├── Snake.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── LICENSE
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/itkrivoshei/react-snake-game.git
cd react-snake-game/react-snake
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open locally:

```text
http://localhost:3000
```

## Build

Create a production build:

```bash
npm run build
```

The production output is generated in:

```text
react-snake/build/
```

## Deployment

The repository includes a GitHub Actions workflow for automatic GitHub Pages deployment.

On every push to the `master` branch, the workflow:

1. checks out the repository,
2. installs dependencies in `react-snake/`,
3. builds the React app,
4. creates a `404.html` fallback,
5. deploys the build output to GitHub Pages.

GitHub Pages should be configured as:

```text
Settings → Pages → Source → GitHub Actions
```

## Portfolio Notes

This project is useful as a public portfolio repository because it demonstrates:

- React component refactoring from class-based code to hooks
- State lifecycle management with `useState`, `useEffect`, `useRef`, `useMemo`, and `useCallback`
- Interval lifecycle management and cleanup
- Keyboard event handling
- Browser localStorage usage for high-score persistence
- Collision detection and game-loop logic
- Responsive UI design with CSS variables
- Basic accessibility improvements through semantic labels and focus states
- Static frontend deployment with GitHub Actions and GitHub Pages

## Status

Maintained as a portfolio project.

The original version was an early React learning project. The current version keeps the same game idea but refreshes the code structure, UI, documentation, and deployment setup for a cleaner public profile.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.
