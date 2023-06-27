import React, { useState, useEffect, useCallback } from 'react';
import ButtonContainer from './components/ButtonContainer/ButtonContainer';
import InstructionsModal from './components/InstructionsModal/InstructionsModal';
import GameOverModal from './components/GameOverModal/GameOverModal';
import PlayAgainButton from './components/PlayAgainButton/PlayAgainButton';
import './App.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

enum GameMode {
  PlayerFirst = 'Player First',
  AIFirst = 'AI First',
}

const App: React.FC = () => {
  const [matches, setMatches] = useState<number>(25);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [showPlayAgain, setShowPlayAgain] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(true);
  const [playerTotalMatches, setPlayerTotalMatches] = useState<number>(0);
  const [aiTotalMatches, setAITotalMatches] = useState<number>(0);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [pileSize, setPileSize] = useState<number>(25);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [maxMatches, setMaxMatches] = useState<number>(3);

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
      if (numMatches >= 1 && numMatches <= maxMatches) {
        const remainingMatches = matches - numMatches;
        if (remainingMatches >= 0) {
          setMatches(remainingMatches);
          setPlayerTurn(false);
          setPlayerTotalMatches(playerTotalMatches + numMatches);
          checkWinner(remainingMatches);
          checkAvailableMoves(remainingMatches);
        }
      }
    }
  };

  const checkAvailableMoves = useCallback((matches: number) => {
    if (matches === 0) {
      setDisableButtons(true);
    }
  }, []);

  const checkWinner = useCallback((matches: number) => {
    if (matches === 0) {
      const playerAvailableMoves = playerTotalMatches % 2 !== 0 && aiTotalMatches % 2 === 0;
      const aiAvailableMoves = aiTotalMatches % 2 !== 0 && playerTotalMatches % 2 === 0;

      if (!playerAvailableMoves || !aiAvailableMoves) {
        const winner = playerTurn ? '🤖 AI' : '🥳 Player';
        setWinner(winner);
      } else {
        setWinner('');
      }
    }
  }, [aiTotalMatches, playerTotalMatches, playerTurn]);

  const makeAITurn = useCallback(() => {
    const availableMoves = matches > 0;
  
    if (!availableMoves) {
      setTimeout(() => {
        checkWinner(matches);
        checkAvailableMoves(matches);
      }, 0);
      return;
    }
  
    let aiMatches;
  
    if (matches === maxMatches) {
      if (aiTotalMatches % 2 !== 0) {
        aiMatches = maxMatches;
      } else {
        aiMatches = maxMatches - 1;
      }
    } else if (matches === 1) {
      aiMatches = 1;
    } else {
      const remainder = (matches - 1) % (maxMatches + 1);
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
  }, [matches, aiTotalMatches, setMatches, setPlayerTurn, setAITotalMatches, checkWinner, checkAvailableMoves, maxMatches]);
  
  useEffect(() => {
    if (!playerTurn && matches > 0) {
      setTimeout(makeAITurn, 1000);
    }
  }, [playerTurn, matches, makeAITurn]);
  

  const closeModal = () => {
    setWinner('');
    setShowPlayAgain(false);
    setShowRulesModal(false);
    localStorage.setItem('instructionsShown', 'true');
  };

  const handlePlayAgain = () => {
    setMatches(pileSize);
    setPlayerTurn(gameMode === GameMode.PlayerFirst);
    setWinner('');
    setPlayerTotalMatches(0);
    setAITotalMatches(0);
    setDisableButtons(false);
    setGameMode(null);
    setPileSize(25);
    setMaxMatches(3);
  };

  const showInstructionsModal = () => {
    setShowRulesModal(true);
  };

  const handleGameModeSelect = (mode: GameMode) => {
    if (
      pileSize < 7 ||
      pileSize > 99 ||
      pileSize % 2 === 0 ||
      (pileSize === 7 && maxMatches > 5) ||
      (pileSize === 9 && maxMatches > 7) ||
      maxMatches < 2 ||
      maxMatches > 9
    ) {
      setErrorModalOpen(true);
      setGameMode(null);
    } else {
      setGameMode(mode);
      setPlayerTurn(mode === GameMode.PlayerFirst);
    }
  };

  const handlePileSizeSelect = () => {
    if (pileSize >= 7 && pileSize <= 99 && pileSize % 2 !== 0) {
      setMatches(pileSize);
    } else {
      setErrorModalOpen(true);
    }
  };

  const handleMaxMatchesSelect = () => {
    if (maxMatches >= 2 && maxMatches <= 9) {
      setMaxMatches(maxMatches);
    } else {
      setErrorModalOpen(true);
    }
  };

  if (!gameMode && !showRulesModal) {
    return (
      <div className="App container">
        <h1>Enter Pile Size</h1>
        <div className="pileSizeInput">
          <input
            type="number"
            value={pileSize}
            onChange={(e) => setPileSize(parseInt(e.target.value))}
            onBlur={handlePileSizeSelect}
          />
          <button onClick={handlePileSizeSelect}>Select</button>
        </div>
        <h1>Select Maximum Matches per Turn</h1>
        <div className="maxMatchesInput">
          <input
            type="number"
            value={maxMatches}
            onChange={(e) => setMaxMatches(parseInt(e.target.value))}
            onBlur={handleMaxMatchesSelect}
          />
          <button onClick={handleMaxMatchesSelect}>Select</button>
        </div>
        <h1>Select Game Mode</h1>
        <div className="gameModeButtons">
          <button onClick={() => handleGameModeSelect(GameMode.PlayerFirst)}>Player First</button>
          <button onClick={() => handleGameModeSelect(GameMode.AIFirst)}>AI First</button>
        </div>
        <Modal
          isOpen={errorModalOpen}
          onRequestClose={() => setErrorModalOpen(false)}
          contentLabel="Error Modal"
          className="modal"
          overlayClassName="modalOverlay"
        >
          <h2>Error: Invalid Input</h2>
          {pileSize < 7 || pileSize > 99 || pileSize % 2 === 0 ? (
            <p>Please enter a value between 7 and 99 (inclusive) and ensure it is an odd number.</p>
          ) : pileSize === 7 && maxMatches > 5 ? (
            <p>For a pile size of 7, the maximum matches per turn cannot exceed 5.</p>
          ) : pileSize === 9 && maxMatches > 7 ? (
            <p>For a pile size of 9, the maximum matches per turn cannot exceed 7.</p>
          ) : (
            <p>Please enter a value between 2 and 9 (inclusive) for the maximum matches per turn.</p>
          )}
          <button onClick={() => setErrorModalOpen(false)}>Close</button>
        </Modal>
      </div>
    );
  }

  return (
    <div className="App container">
      <h1>Matches: {matches}</h1>
      <h2>{playerTurn ? '⏳ Player' : '🤔 AI'}'s Turn</h2>
      {playerTurn && matches > 0 ? (
        <ButtonContainer
          maxMatches={maxMatches}
          handleMatchSelection={handleMatchSelection}
          disableButtons={disableButtons}
        />
      ) : (
        <div className="buttonContainer">
          {Array.from({ length: maxMatches }, (_, index) => index + 1).map((num) => (
            <button key={num} disabled>
              Take {num}
            </button>
          ))}
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
