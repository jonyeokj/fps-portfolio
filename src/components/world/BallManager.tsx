'use client';

import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Ball from './Ball';
import { useGameStore } from '@/stores/gameStore';

const BALL_RADIUS = 0.5;
const MIN_DISTANCE = BALL_RADIUS * 2;
const MAX_ATTEMPTS = 50;

type Position = [number, number, number];

const generateNonOverlappingPosition = (existing: Position[]): Position => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidate: Position = [
      Math.random() * 28 - 14, // x: -14 to 14
      Math.random() * 9 + 0.5, // y: 0.5 to 9.5
      19, // z
    ];

    const tooClose = existing.some(([x, y]) => {
      const dx = candidate[0] - x;
      const dy = candidate[1] - y;
      return Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE;
    });

    if (!tooClose) return candidate;
  }

  // Fallback if no position found after max attempts
  console.warn('Could not find a non-overlapping position after max attempts');
  return [0, 5, 19];
};

const BallManager = () => {
  const [balls, setBalls] = useState<
    { id: string; position: Position; color?: string }[]
  >([]);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const startGame = useGameStore((s) => s.startGame);
  const incrementScore = useGameStore((state) => state.incrementScore);

  // Show one center ball before the game starts, spawn 5 balls when the game starts
  useEffect(() => {
    if (!gameStarted) {
      setBalls([{ id: 'intro-ball', position: [0, 5, 19], color: 'gold' }]);
    } else {
      const newBalls = [];
      for (let i = 0; i < 5; i++) {
        const position = generateNonOverlappingPosition(
          newBalls.map((b) => b.position),
        );
        newBalls.push({ id: uuidv4(), position });
      }
      setBalls(newBalls);
    }
  }, [gameStarted]);

  // Handle click/hit
  const handleHit = useCallback(
    (id: string) => {
      if (!gameStarted && id === 'intro-ball') {
        startGame();
        return;
      }

      setBalls((prev) => {
        const next = prev.filter((b) => b.id !== id);

        if (next.length < 5) {
          const newPos = generateNonOverlappingPosition(
            next.map((b) => b.position),
          );
          next.push({ id: uuidv4(), position: newPos });
        }

        return next;
      });

      incrementScore();
    },
    [gameStarted, startGame, incrementScore],
  );

  return (
    <>
      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          position={ball.position}
          onHit={handleHit}
          color={ball.color}
          isMoving={gameStarted}
        />
      ))}
    </>
  );
};

export default BallManager;
