import React, { MouseEventHandler } from 'react';
import MatchButton from '../MatchButton/MatchButton';

interface ButtonContainerProps {
  disabledButtons: boolean;
  handleMatchSelection: (numMatches: number) => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  disabledButtons,
  handleMatchSelection,
}) => {
  const handleClick = (numMatches: number): MouseEventHandler<HTMLButtonElement> => {
    return () => handleMatchSelection(numMatches);
  };

  return (
    <div className="buttonContainer">
      <MatchButton disabled={disabledButtons} onClick={handleClick(1)} label="Take 1" />
      <MatchButton disabled={disabledButtons} onClick={handleClick(2)} label="Take 2" />
      <MatchButton disabled={disabledButtons} onClick={handleClick(3)} label="Take 3" />
    </div>
  );
};

export default ButtonContainer;
