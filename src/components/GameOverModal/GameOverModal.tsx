import React, { MouseEventHandler } from 'react';
import Modal from 'react-modal';

interface GameOverModalProps {
  isOpen: boolean;
  closeModal: MouseEventHandler<HTMLButtonElement>;
  winner: string;
  handlePlayAgain: MouseEventHandler<HTMLButtonElement>;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  closeModal,
  winner,
  handlePlayAgain,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modalOverlay"
      contentLabel="Game Over"
    >
      <button className="closeButton" onClick={closeModal}>
        ×
      </button>
      <h3>{`${winner} wins!`}</h3>
      <button onClick={handlePlayAgain}>Play Again</button>
    </Modal>
  );
};

export default GameOverModal;
