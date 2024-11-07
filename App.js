// import React from 'react';
import Board from './Board.js';
// import GuessInput from './GuessInput.js';
// import FoundSolutions from './FoundSolutions.js';
// import SummaryResults from './SummaryResults.js';
// import ToggleGameState from './ToggleGameState.js';
import logo from './logo.png';
import './App.css';
// import logo from './logo.svg';
// import './App.css';

// // export default App;
// function App() {

//   return (
//     <div className="App">
      
//         <img src={logo}  width="25%" height="25%" class="logo" alt="Bison Boggle Logo" /> 

//         <ToggleGameState/>


//         <div>
//           <Board board />

//           <GuessInput />
//           <FoundSolutions />
//         </div>

//         <div>
//           <Board board/>
//           <SummaryResults />
//           <FoundSolutions />
          
//         </div>

//     </div>
//   );
// }
// export default App;

// src/components/App.js
import React, { useCallback, useState, useEffect } from 'react';
import SelectGridSize from './SelectGridSize';
const generateBoard = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 16 }, () => letters[Math.floor(Math.random() * 26)]);
};

const possibleWords = ["CAT", "DOG", "BEE", "ANT", "COW", "BAT", "PIG", "HEN"];

const App = () => {
    const [board, setBoard] = useState([]);
    const [wordsFound, setWordsFound] = useState([]);
    const [inputWord, setInputWord] = useState("");
    const [timer, setTimer] = useState(60);
    const [gameActive, setGameActive] = useState(false);
		const [remainingWords, setRemainingWords] = useState([]);
		const [gridSize, setGridSize] = useState("4x4");

		const endGame = useCallback(() => {
        setGameActive(false);
        const notFoundWords = possibleWords.filter(word => !wordsFound.includes(word));
        setRemainingWords(notFoundWords);
    }, [wordsFound]);
		
    useEffect(() => {
        if (gameActive && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timer === 0 && gameActive) {
						endGame();
            // setGameActive(false);
        }
    }, [timer, gameActive, endGame]);

    const startGame = () => {
        setBoard(generateBoard());
        setWordsFound([]);
        setTimer(60);
        setGameActive(true);
				setRemainingWords([]);
    };

    const stopGame = () => {
        setGameActive(false);
    };

		const handleGridSizeChange = (size) => {
        setGridSize(size);
        // Additional logic to adjust the grid can go here
    };

		// const endGame = () => {
    //     setGameActive(false);
    //     const notFoundWords = possibleWords.filter(word => !wordsFound.includes(word));
    //     setRemainingWords(notFoundWords);
    // };

    const submitWord = () => {
        if (inputWord && !wordsFound.includes(inputWord)) {
            setWordsFound([...wordsFound, inputWord]);
        } else {
            alert("Word already found or invalid");
        }
        setInputWord("");
    };

    return (
        <div className="App">
            <h1>Boggle Solver</h1>
						<img src={logo} width="25%" height="5%" className="" alt="logo" />
            <SelectGridSize onGridSizeChange={handleGridSizeChange} />
            <p>Selected Grid Size: {gridSize}</p>
						<button onClick={startGame} disabled={gameActive}>Start</button>
            <button onClick={stopGame} disabled={!gameActive}>Stop</button>
            <div>Time Remaining: {timer}s</div>
            {gameActive && <Board board={board} />}
            <input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value.toUpperCase())}
                disabled={!gameActive}
                placeholder="Enter word..."
            />
            <button onClick={submitWord} disabled={!gameActive || !inputWord}>Submit Word</button>
            <div>
                <h2>Words Found</h2>
                <ul>
                    {wordsFound.map((word, index) => <li key={index}>{word}</li>)}
                </ul>
            </div>
						{!gameActive && remainingWords.length > 0 && (
                <div>
                    <h2>Words Remaining</h2>
                    <ul>
                        {remainingWords.map((word, index) => <li key={index}>{word}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
