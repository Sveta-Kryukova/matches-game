import React, { MouseEventHandler } from 'react';

interface PlayAgainButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PlayAgainButton: React.FC<PlayAgainButtonProps> = ({ onClick }) => {
  return (
    <button className="playAgainButton" onClick={onClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;
