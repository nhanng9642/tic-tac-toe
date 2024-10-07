import React, { useState } from "react";
import Board from "./Board";

const rows = 3;
const cols = 3;

export default function Game() {
    const [history, setHistory] = useState(
        [Array.from({ length: rows }, () => Array(cols).fill(null))]
    );
    
    const [locations, setLocations] = useState([null]);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [sorted, setSorted] = useState(false);

    const xIsNext = currentStep % 2 === 0;
    const currentSquares = history[currentStep];
    const lastStep = currentStep === rows * cols;
 
    const jumpTo = (step) => {
        setCurrentStep(step);
    }

    let moves = history.map((squares, move) => {
        if (move == currentStep)
            return (
                <li key={move}>
                    <span className="mb-4">{`You are at move #${move}` +
                convertLocation(locations[move])}</span>
                </li>
            ); 

        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button className="mb-4" onClick={() => jumpTo(move)}>{description + 
                convertLocation(locations[move])}</button>
          </li>
        );
      });
    
    if (sorted) {
        moves = moves.reverse();
    }


    const handlePlay = (nextSquares, row, col) => {
        const newHistory = history.slice(0, currentStep + 1);
        setHistory([...newHistory, nextSquares]);

        setCurrentStep(newHistory.length);
        const newLocations = locations.slice(0, currentStep + 1);
        setLocations([...newLocations, {row, col}])
    }

    return (
        <>
            <Board squares={currentSquares} 
                    xIsNext={xIsNext}
                    onPlay = {handlePlay}
                    lastStep={lastStep}
                    >
                    </Board>

            <div className="game-info">
                <ol>{moves}</ol>
            </div>

            <button onClick={() => setSorted(!sorted)}>Sort</button>
        </>
    )
}

export const calculateWinner = (squares) => {
    //check row
    for (let i = 0; i < rows; i++) {
        if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
            return [squares[i][0], [[i, 0], [i, 1], [i, 2]]];
        }
    }

    //check column
    for (let i = 0; i < cols; i++) {
        if (squares[0][i] && squares[0][i] === squares[1][i] && squares[0][i] === squares[2][i]) {
            return [squares[0][i], [[0, i], [1, i], [2, i]]];
        }
    }

    //check diagonal
    for (let i = 0; i < 1; i++) {
        if (squares[i][i] && squares[i][i] === squares[i + 1][i + 1] && squares[i][i] === squares[i + 2][i + 2]) {
            return [squares[i][i], [[i, i], [i + 1, i + 1], [i + 2, i + 2]]];
        }
    }

    for (let i = 0; i < 1; i++) {
        if (squares[i][i + 2] && squares[i][i + 2] === squares[i + 1][i + 1] && squares[i][i + 2] === squares[i + 2][i]) {
            return [squares[i][i + 2], [[i, i + 2], [i + 1, i + 1], [i + 2, i]]];
        }
    }

    return [null, null];
}

const convertLocation = (location) => {
    if (location == null)
        return " ";
    return `  (${location.row}, ${location.col})`
}