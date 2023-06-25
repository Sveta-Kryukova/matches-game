import React, { MouseEventHandler } from 'react';

interface MatchButtonProps {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const MatchButton: React.FC<MatchButtonProps> = ({ disabled, onClick, label }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default MatchButton;
