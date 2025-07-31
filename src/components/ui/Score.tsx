'use client';

import styled from 'styled-components';
import { useGameStore } from '@/stores/gameStore';

const Wrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 50;
  font-family: monospace;
`;

const ScoreBox = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  min-width: 80px;
  text-align: center;
`;

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Score = () => {
  const score = useGameStore((state) => state.score);
  const resetScore = useGameStore((state) => state.resetScore);

  return (
    <Wrapper>
      <ScoreBox>Score: {score}</ScoreBox>
      <ResetButton onClick={resetScore}>Reset</ResetButton>
    </Wrapper>
  );
};

export default Score;
