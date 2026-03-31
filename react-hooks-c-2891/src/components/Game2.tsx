"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Star {
  id: number;
  left: number;
  top: number;
}

export default function Game2() {
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [speed, setSpeed] = useState(1);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stars_highscore");
    if (saved) {
      setHighScore(Number(saved));
    }
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawn = setInterval(() => {
      const newStar: Star = {
        id: Date.now(),
        left: Math.random() * 90,
        top: 0,
      };
      setStars(prev => [...prev, newStar]);
    }, 1000);

    return () => clearInterval(spawn);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const fall = setInterval(() => {
      setStars(prev =>
        prev.map(star => ({
          ...star,
          top: star.top + speed,
        }))
      );
    }, 50);

    return () => clearInterval(fall);
  }, [speed, gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    stars.forEach(star => {
      if (star.top > 90) {
        setStars(prev => prev.filter(s => s.id !== star.id));
        setLives(prev => prev - 1);
      }
    });
  }, [stars, gameStarted, gameOver]);

  useEffect(() => {
    if (lives <= 0 && gameStarted) {
      setGameOver(true);
      toast.error("💀 Game Over!");

      if (score > highScore) {
        localStorage.setItem("stars_highscore", score.toString());
        setHighScore(score);

        toast.success("🏆 New High Score!");
      }
    }
  }, [lives, gameStarted]);

  const catchStar = (id: number) => {
    if (!gameStarted || gameOver) return;

    setStars(prev => prev.filter(star => star.id !== id));
    setScore(prev => prev + 1);

    if ((score + 1) % 5 === 0) {
      setSpeed(prev => prev + 0.5);
      toast.info("⚡ Speed Up!");
    }
  };

  const startGame = () => {
    setStars([]);
    setScore(0);
    setLives(3);
    setSpeed(1);
    setGameOver(false);
    setGameStarted(true);

    toast.info("🎮 Game Dimulai!");
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
  };

  return (
    <div className="relative w-[300px] h-[400px] bg-black rounded-xl overflow-hidden">
      <div className="absolute top-2 left-2 text-white text-sm">
        ⭐ Score: {score}
      </div>
      <div className="absolute top-2 right-2 text-red-400 text-sm">
        ❤️ Lives: {lives}
      </div>
      <div className="absolute bottom-2 left-2 text-yellow-300 text-sm font-semibold">
        🏆 High Score: {highScore}
      </div>

      {stars.map(star => (
        <div
          key={star.id}
          onClick={() => catchStar(star.id)}
          className="absolute text-2xl cursor-pointer"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        >
          ⭐
        </div>
      ))}

      {!gameStarted && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
          <h2 className="text-xl mb-4">Catching The Stars ⭐</h2>

          <p className="mb-3 text-yellow-300">
            🏆 High Score: {highScore}
          </p>

          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            ▶ Start Game
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
          <h2 className="text-xl mb-4">Game Over</h2>

          <p className="mb-3">Score: {score}</p>
          <p className="mb-4 text-yellow-300">🏆 High Score: {highScore}</p>

          <button
            onClick={restartGame}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}