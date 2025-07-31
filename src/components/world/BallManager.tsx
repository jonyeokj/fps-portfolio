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
      -14, // z
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
  return [0, 5, -14.5];
};

const BallManager = () => {
  const [balls, setBalls] = useState<{ id: string; position: Position }[]>([]);
  const incrementScore = useGameStore((state) => state.incrementScore);

  // Spawn 5 balls on mount
  useEffect(() => {
    const newBalls: { id: string; position: Position }[] = [];

    for (let i = 0; i < 5; i++) {
      const position = generateNonOverlappingPosition(
        newBalls.map((b) => b.position),
      );
      newBalls.push({ id: uuidv4(), position });
    }

    setBalls(newBalls);
  }, []);

  // Handle click/hit
  const handleHit = useCallback(
    (id: string) => {
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
    [incrementScore],
  );

  return (
    <>
      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          position={ball.position}
          onHit={handleHit}
        />
      ))}
    </>
  );
};

export default BallManager;
