# React Snake Game

[![Deploy React app to GitHub Pages](https://img.shields.io/github/actions/workflow/status/itkrivoshei/react-snake-game/deploy-pages.yml?branch=master&style=flat-square&label=deploy)](https://github.com/itkrivoshei/react-snake-game/actions/workflows/deploy-pages.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-222222?style=flat-square&logo=github)](https://itkrivoshei.github.io/react-snake-game/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Browser-based Snake game built with React and deployed to GitHub Pages.

## Tech stack

- React
- JavaScript
- CSS
- Browser `localStorage`
- GitHub Actions
- GitHub Pages

## Features

- Classic Snake gameplay
- Start, pause, reset, and replay flow
- Keyboard controls with arrow keys and spacebar
- Mobile direction controls
- Score, level, and persistent high-score tracking
- Food spawning that avoids the snake body
- Wall and self-collision detection
- Auto-pause when the browser tab is hidden

## Live demo

```text
https://itkrivoshei.github.io/react-snake-game/
```

## Installation

```bash
git clone https://github.com/itkrivoshei/react-snake-game.git
cd react-snake-game/react-snake
npm install
```

## Development

```bash
npm start
```

The app runs locally at:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
react-snake/build/
```

## Tests

```bash
npm test
```

No dedicated test cases are included yet. The command uses the default Create React App test runner configuration.

## Deployment

The repository includes a GitHub Actions workflow for GitHub Pages deployment.

Workflow file:

```text
.github/workflows/deploy-pages.yml
```

The workflow builds the app from `react-snake/` and publishes `react-snake/build/` to GitHub Pages on pushes to `master`.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml
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
├── LICENSE
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).
