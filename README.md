<div align="center">

# React Snake Game

Classic Snake gameplay in React with keyboard controls, mobile buttons, persistent high score, and GitHub Pages deployment.

[![Play](https://img.shields.io/badge/play-GitHub%20Pages-2ea44f?style=for-the-badge&logo=githubpages&logoColor=white)](https://itkrivoshei.github.io/react-snake-game/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/itkrivoshei/react-snake-game/deploy-pages.yml?branch=master&style=for-the-badge&label=deploy&logo=githubactions&logoColor=white)](https://github.com/itkrivoshei/react-snake-game/actions/workflows/deploy-pages.yml)
[![React](https://img.shields.io/badge/React-16-61dafb?style=for-the-badge&logo=react&logoColor=111)](react-snake/package.json)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

</div>

## Gameplay

- Explicit ready, playing, paused, and game-over states.
- Arrow-key movement with reverse-direction blocking.
- Spacebar start/pause flow.
- Direction buttons for touch devices.
- Score, level, and high score stored in `localStorage`.
- Food placement avoids the snake body.
- The game pauses automatically when the tab is hidden.

## Local Setup

```bash
git clone https://github.com/itkrivoshei/react-snake-game.git
cd react-snake-game/react-snake
npm install
npm start
```

Open `http://localhost:3000`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Run the CRA dev server |
| `npm run build` | Build the static game |
| `npm test` | Run the default CRA test command |

## Implementation Notes

| Piece | Detail |
| --- | --- |
| Grid | `100 x 100` logical board with `2%` cells |
| Speed | Starts at `180ms`, decreases after food, bottoms at `70ms` |
| State | One React state object for food, snake, direction, score, speed, and status |
| Rendering | `Snake` and `Food` are memoized presentational components |
| Persistence | `react-snake-game-high-score` in browser storage |

## Deployment

The Pages workflow builds from `react-snake/`, copies `index.html` to `404.html` for SPA fallback, and uploads `react-snake/build`.

## License

[MIT](LICENSE)
