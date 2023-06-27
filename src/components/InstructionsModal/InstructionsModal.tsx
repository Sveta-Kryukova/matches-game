import React, { MouseEventHandler } from 'react';
import Modal from 'react-modal';

interface InstructionsModalProps {
  isOpen: boolean;
  closeModal: MouseEventHandler<HTMLButtonElement>;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modalOverlay"
      contentLabel="Rules"
    >
      <button className="closeButton" onClick={closeModal}>
        ×
      </button>
      <h3>Game Rules</h3>
      <p>Here are the rules of the game:</p>
      <ul>
        <li>There are 25 matches on the table.</li>
        <li>Players take turns removing 1, 2, or 3 matches from the table.</li>
        <li>The game is over once all matches are taken. Whoever has the even amount of matches wins.</li>
        <li>User can choose game mode (Player first or Ai first move) </li>
        <li>User can choose Pile Size (Pile Size can be from 7 to 9) </li>
        <li>User can choose Maximum Matches per turn (Maximum Matches per turn can be from 2 to 9) </li>
      </ul>
      <button onClick={closeModal}>Start Game</button>
    </Modal>
  );
};

export default InstructionsModal;
