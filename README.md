# React Snake Game

Modern browser-based Snake game built with React.

This repository is maintained as a compact portfolio project. It shows an interactive frontend application with game state, keyboard input, collision detection, score tracking, responsive UI styling, and static deployment through GitHub Pages.

## Live Demo

```text
https://itkrivoshei.github.io/react-snake-game/
```

## Overview

The app implements the classic Snake loop in the browser:

```text
Keyboard input
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
- GitHub Actions
- GitHub Pages

## Features

- Classic Snake gameplay
- Keyboard controls with arrow keys
- Start, pause, reset, and replay flow
- Score and high-score tracking
- Food spawning logic that avoids the snake body
- Wall and self-collision detection
- Increasing speed after eating food
- Responsive dark UI
- Static deployment through GitHub Pages

## Controls

| Key | Action |
| --- | --- |
| `Arrow keys` | Move snake |
| `Space` | Start or pause game |

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
- State lifecycle management with `useState`, `useEffect`, `useRef`, and `useCallback`
- Interval lifecycle management and cleanup
- Keyboard event handling
- Collision detection and game-loop logic
- Responsive UI design with CSS variables
- Static frontend deployment with GitHub Actions and GitHub Pages

## Status

Maintained as a portfolio project.

The original version was an early React learning project. The current version keeps the same game idea but refreshes the code structure, UI, documentation, and deployment setup for a cleaner public profile.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.
