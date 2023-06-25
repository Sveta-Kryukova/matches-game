import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

function App(): JSX.Element {
  const [matches, setMatches] = useState<number>(25);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  useEffect(() => {
    if (!playerTurn && matches > 0) {
      setTimeout(makeAITurn, 1000);
    }
  }, [playerTurn, matches]);

  const handleMatchSelection = (numMatches: number): void => {
    if (matches - numMatches >= 0 && playerTurn) {
      setMatches(matches - numMatches);
      setPlayerTurn(!playerTurn);
      if (matches - numMatches === 0) {
        const winner = playerTurn ? 'AI' : 'Player';
        setWinner(winner);
      }
    }
  };

  const makeAITurn = (): void => {
    let aiMatches: number;
    if ((matches - 1) % 4 === 0) {
      aiMatches = 1;
    } else if ((matches - 2) % 4 === 0) {
      aiMatches = 2;
    } else if ((matches - 3) % 4 === 0) {
      aiMatches = 3;
    } else {
      aiMatches = Math.floor(Math.random() * 3) + 1;
    }
    setMatches(matches - aiMatches);
    setPlayerTurn(!playerTurn);
    if (matches - aiMatches === 0) {
      const winner = playerTurn ? 'Player' : 'AI';
      setWinner(winner);
    }
  };

  const closeModal = (): void => {
    setWinner('');
    setMatches(25);
    setPlayerTurn(true);
  };

  return (
    <div className="App container">
      <h1>Matches: {matches}</h1>
      <h2>{playerTurn ? 'Player' : 'AI'}'s Turn</h2>
      {playerTurn && matches > 0 && (
        <div className="buttonContainer">
          <button disabled={disableButtons} onClick={() => handleMatchSelection(1)}>Take 1</button>
          <button disabled={disableButtons} onClick={() => handleMatchSelection(2)}>Take 2</button>
          <button disabled={disableButtons} onClick={() => handleMatchSelection(3)}>Take 3</button>
        </div>
      )}
      {!playerTurn && (
        <div className="buttonContainer">
          <button disabled={true}>Take 1</button>
          <button disabled={true}>Take 2</button>
          <button disabled={true}>Take 3</button>
        </div>
      )}
      <Modal
        isOpen={!!winner}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modalOverlay"
        contentLabel="Game Over"
      >
        <h3>{`${winner} wins!`}</h3>
        <button onClick={closeModal}>Play Again</button>
      </Modal>
    </div>
  );
}

export default App;
