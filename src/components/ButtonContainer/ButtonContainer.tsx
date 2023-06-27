import React from 'react';

type ButtonContainerProps = {
  maxMatches: number;
  handleMatchSelection: (numMatches: number) => void;
  disableButtons: boolean;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  maxMatches,
  handleMatchSelection,
  disableButtons,
}) => {
  const matchButtons = Array.from({ length: maxMatches }, (_, index) => index + 1);

  return (
    <div className="buttonContainer">
      {matchButtons.map((num) => (
        <button key={num} onClick={() => handleMatchSelection(num)} disabled={disableButtons}>
          Take {num}
        </button>
      ))}
    </div>
  );
};

export default ButtonContainer;
