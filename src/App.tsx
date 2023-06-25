import React, { useState, useEffect } from 'react';
import ButtonContainer from './components/ButtonContainer/ButtonContainer';
import InstructionsModal from './components/InstructionsModal/InstructionsModal';
import GameOverModal from './components/GameOverModal/GameOverModal';
import PlayAgainButton from './components/PlayAgainButton/PlayAgainButton';
import './App.css';

const App: React.FC = () => {
  const [matches, setMatches] = useState<number>(25);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [showPlayAgain, setShowPlayAgain] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(true);
  const [playerTotalMatches, setPlayerTotalMatches] = useState<number>(0);
  const [aiTotalMatches, setAITotalMatches] = useState<number>(0);

  useEffect(() => {
    if (!playerTurn && matches > 0) {
      setTimeout(makeAITurn, 1000);
    }
  }, [playerTurn, matches]);

  useEffect(() => {
    if (winner) {
      setShowPlayAgain(true);
    }
  }, [winner]);

  useEffect(() => {
    const instructionsShown = localStorage.getItem('instructionsShown');
    setShowRulesModal(!instructionsShown);
  }, []);

  const handleMatchSelection = (numMatches: number) => {
    if (playerTurn) {
      const remainingMatches = matches - numMatches;
      if (remainingMatches >= 0) {
        setMatches(remainingMatches);
        setPlayerTurn(false);
        setPlayerTotalMatches(playerTotalMatches + numMatches);
        checkWinner(remainingMatches);
        checkAvailableMoves(remainingMatches);
      }
    }
  };

  const makeAITurn = () => {
    const availableMoves = matches > 0;

    if (!availableMoves) {
      return;
    }

    let aiMatches: number;

    if (matches === 3) {
      if (aiTotalMatches % 2 !== 0) {
        aiMatches = 3;
      } else {
        aiMatches = 2;
      }
    } else if (matches === 2) {
      if (aiTotalMatches % 2 !== 0) {
        aiMatches = 1;
      } else {
        aiMatches = 2;
      }
    } else if (matches === 1) {
      aiMatches = aiTotalMatches % 2 !== 0 ? 1 : 1;
    } else {
      const remainder = matches % 4;
      aiMatches = remainder === 0 ? 1 : remainder;
    }

    const remainingMatches = matches - aiMatches;
    setMatches(remainingMatches);
    setPlayerTurn(true);
    setAITotalMatches(aiTotalMatches + aiMatches);

    setTimeout(() => {
      checkWinner(remainingMatches);
      checkAvailableMoves(remainingMatches);
    }, 0);
  };

  const checkAvailableMoves = (matches: number) => {
    if (matches === 0) {
      setDisableButtons(true);
    }
  };

  const checkWinner = (matches: number) => {
    if (matches === 0) {
      const winner = playerTotalMatches % 2 === 0 ? '🥳 Player' : '🤖 AI';
      setWinner(winner);
    }
  };

  const closeModal = () => {
    setWinner('');
    setShowPlayAgain(false);
    setShowRulesModal(false);
    localStorage.setItem('instructionsShown', 'true');
  };

  const handlePlayAgain = () => {
    setMatches(25);
    setPlayerTurn(true);
    setWinner('');
    setPlayerTotalMatches(0);
    setAITotalMatches(0);
    setDisableButtons(false);
  };

  const showInstructionsModal = () => {
    setShowRulesModal(true);
  };

  return (
    <div className="App container">
      <h1>Matches: {matches}</h1>
      <h2>{playerTurn ? '⏳ Player' : '🤔 AI'}'s Turn</h2>
      {playerTurn && matches > 0 && (
        <ButtonContainer disabledButtons={disableButtons} handleMatchSelection={handleMatchSelection} />
      )}
      {!playerTurn && (
        <div className="buttonContainer">
          {(matches !== 0 || winner) && (
            <>
              <button disabled={true}>Take 1</button>
              <button disabled={true}>Take 2</button>
              <button disabled={true}>Take 3</button>
            </>
          )}
        </div>
      )}
      {matches === 0 && !winner && <button onClick={handlePlayAgain}>Play Again</button>}
      <button className="instructionsButton" onClick={showInstructionsModal}>
        Instructions
      </button>
      <InstructionsModal isOpen={showRulesModal} closeModal={closeModal} />
      <GameOverModal isOpen={!!winner} closeModal={closeModal} winner={winner} handlePlayAgain={handlePlayAgain} />
      {showPlayAgain && <PlayAgainButton onClick={handlePlayAgain} />}
    </div>
  );
};

export default App;
