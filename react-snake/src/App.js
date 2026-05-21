import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";

const GRID_SIZE = 100;
const CELL_SIZE = 2;
const START_SPEED = 180;
const MIN_SPEED = 70;
const SPEED_STEP = 8;
const HIGH_SCORE_KEY = "react-snake-game-high-score";

const DIRECTIONS = {
  UP: [0, -CELL_SIZE],
  DOWN: [0, CELL_SIZE],
  LEFT: [-CELL_SIZE, 0],
  RIGHT: [CELL_SIZE, 0],
};

const OPPOSITE_DIRECTIONS = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

const STARTING_SNAKE = [
  [20, 50],
  [22, 50],
  [24, 50],
];

const isSamePosition = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const getStoredHighScore = () => {
  try {
    const value = window.localStorage.getItem(HIGH_SCORE_KEY);
    return value ? Number(value) : 0;
  } catch (error) {
    return 0;
  }
};

const saveHighScore = (value) => {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch (error) {
    // Local storage can be unavailable in strict privacy modes.
  }
};

const getRandomFood = (snake = STARTING_SNAKE) => {
  const max = GRID_SIZE - CELL_SIZE;
  let food;

  do {
    const x = Math.floor((Math.random() * (max + 1)) / CELL_SIZE) * CELL_SIZE;
    const y = Math.floor((Math.random() * (max + 1)) / CELL_SIZE) * CELL_SIZE;
    food = [x, y];
  } while (snake.some((part) => isSamePosition(part, food)));

  return food;
};

const createInitialGame = (highScore = 0) => ({
  food: getRandomFood(STARTING_SNAKE),
  speed: START_SPEED,
  direction: "RIGHT",
  snake: STARTING_SNAKE,
  status: "ready",
  score: 0,
  highScore,
});

function App() {
  const [game, setGame] = useState(() => createInitialGame(getStoredHighScore()));
  const directionRef = useRef("RIGHT");
  const nextDirectionRef = useRef("RIGHT");

  const level = useMemo(() => Math.floor(game.score / 3) + 1, [game.score]);

  const resetDirection = useCallback((direction = "RIGHT") => {
    directionRef.current = direction;
    nextDirectionRef.current = direction;
  }, []);

  const startGame = useCallback(() => {
    setGame((currentGame) => {
      if (currentGame.status === "game-over") {
        const nextGame = createInitialGame(currentGame.highScore);
        resetDirection(nextGame.direction);

        return {
          ...nextGame,
          status: "playing",
        };
      }

      return {
        ...currentGame,
        status: "playing",
      };
    });
  }, [resetDirection]);

  const pauseGame = useCallback(() => {
    setGame((currentGame) => ({
      ...currentGame,
      status: currentGame.status === "playing" ? "paused" : currentGame.status,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGame((currentGame) => {
      const nextGame = createInitialGame(currentGame.highScore);
      resetDirection(nextGame.direction);
      return nextGame;
    });
  }, [resetDirection]);

  const updateDirection = useCallback((nextDirection) => {
    const currentDirection = directionRef.current;

    if (OPPOSITE_DIRECTIONS[currentDirection] === nextDirection) {
      return;
    }

    nextDirectionRef.current = nextDirection;
  }, []);

  const moveSnake = useCallback(() => {
    setGame((currentGame) => {
      if (currentGame.status !== "playing") {
        return currentGame;
      }

      const direction = nextDirectionRef.current;
      const [deltaX, deltaY] = DIRECTIONS[direction];
      const head = currentGame.snake[currentGame.snake.length - 1];
      const nextHead = [head[0] + deltaX, head[1] + deltaY];
      const hitWall =
        nextHead[0] < 0 ||
        nextHead[1] < 0 ||
        nextHead[0] >= GRID_SIZE ||
        nextHead[1] >= GRID_SIZE;
      const ateFood = isSamePosition(nextHead, currentGame.food);
      const bodyForCollision = ateFood ? currentGame.snake : currentGame.snake.slice(1);
      const hitSelf = bodyForCollision.some((part) => isSamePosition(part, nextHead));

      if (hitWall || hitSelf) {
        return {
          ...currentGame,
          status: "game-over",
          highScore: Math.max(currentGame.highScore, currentGame.score),
        };
      }

      const nextSnake = ateFood
        ? [...currentGame.snake, nextHead]
        : [...currentGame.snake.slice(1), nextHead];
      const nextScore = ateFood ? currentGame.score + 1 : currentGame.score;

      directionRef.current = direction;

      return {
        ...currentGame,
        direction,
        snake: nextSnake,
        food: ateFood ? getRandomFood(nextSnake) : currentGame.food,
        score: nextScore,
        highScore: Math.max(currentGame.highScore, nextScore),
        speed: ateFood ? Math.max(MIN_SPEED, currentGame.speed - SPEED_STEP) : currentGame.speed,
      };
    });
  }, []);

  useEffect(() => {
    saveHighScore(game.highScore);
  }, [game.highScore]);

  useEffect(() => {
    if (game.status !== "playing") {
      return undefined;
    }

    const timerId = window.setInterval(moveSnake, game.speed);

    return () => window.clearInterval(timerId);
  }, [game.speed, game.status, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };

      if (keyMap[event.key]) {
        event.preventDefault();

        if (game.status === "playing") {
          updateDirection(keyMap[event.key]);
        }

        return;
      }

      if (event.code === "Space") {
        event.preventDefault();

        if (game.status === "playing") {
          pauseGame();
        } else {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game.status, pauseGame, startGame, updateDirection]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseGame();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pauseGame]);

  const isPlaying = game.status === "playing";
  const isOverlayVisible = game.status !== "playing";
  const statusLabel = game.status.replace("-", " ");
  const overlayTitle =
    game.status === "game-over"
      ? "Game over"
      : game.status === "paused"
      ? "Paused"
      : "Ready";
  const overlayText =
    game.status === "game-over"
      ? `Final score: ${game.score}. Start a new run.`
      : game.status === "paused"
      ? "Press start to continue."
      : "Press start to begin. The snake does not move before you start.";

  return (
    <main className="app-shell">
      <section className="game-panel" aria-label="React Snake Game">
        <div className="hero">
          <p className="eyebrow">React arcade project</p>
          <h1>Snake Game</h1>
          <p className="description">
            Polished browser Snake with explicit start flow, keyboard controls,
            score tracking, collision logic, and GitHub Pages deployment.
          </p>
        </div>

        <div className="stats-grid" aria-label="Game statistics">
          <div className="stat-card">
            <span>Score</span>
            <strong>{game.score}</strong>
          </div>
          <div className="stat-card">
            <span>High score</span>
            <strong>{game.highScore}</strong>
          </div>
          <div className="stat-card">
            <span>Level</span>
            <strong>{level}</strong>
          </div>
          <div className="stat-card">
            <span>Status</span>
            <strong>{statusLabel}</strong>
          </div>
        </div>

        <div className="game-board-wrap">
          <div className="game" role="img" aria-label={`Snake board. Score: ${game.score}`}>
            <Snake snakePart={game.snake} />
            <Food part={game.food} />

            {isOverlayVisible && (
              <div className="game-overlay" role="status" aria-live="polite">
                <h2>{overlayTitle}</h2>
                <p>{overlayText}</p>
                <button className="overlay-action" type="button" onClick={startGame}>
                  {game.status === "game-over" ? "Play again" : "Start"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="actions">
          <button
            className={`primary-action${isPlaying ? " is-playing" : ""}`}
            type="button"
            onClick={isPlaying ? pauseGame : startGame}
          >
            {isPlaying ? "Pause" : game.status === "game-over" ? "Play again" : "Start"}
          </button>
          <button className="secondary-action" type="button" onClick={resetGame}>
            Reset
          </button>
        </div>

        <div className="direction-pad" aria-label="Mobile direction controls">
          <button type="button" onClick={() => updateDirection("UP")} disabled={!isPlaying}>
            ↑
          </button>
          <div>
            <button type="button" onClick={() => updateDirection("LEFT")} disabled={!isPlaying}>
              ←
            </button>
            <button type="button" onClick={() => updateDirection("DOWN")} disabled={!isPlaying}>
              ↓
            </button>
            <button type="button" onClick={() => updateDirection("RIGHT")} disabled={!isPlaying}>
              →
            </button>
          </div>
        </div>

        <footer className="help-row">
          <span>Arrow keys: move</span>
          <span>Space: start / pause</span>
          <span>Auto-pause when tab is hidden</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
