import React, { useState } from "react";
import Square from "./Square";
import { calculateWinner } from "./Game";

export default function Board({squares, onPlay, xIsNext, lastStep}) {
    let status;
    const [winner, squareWinner] = calculateWinner(squares);
    
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (lastStep) {
        status = 'Game Draw';
    } else
        status = `Next player: ${xIsNext ? "X" : "O"}`;


    const handleClick = (row, col) => {
        if (squares[row][col] || winner) {
            return;
        }

        const newSquares = squares.map((row) => row.slice());
        newSquares[row][col] = xIsNext ? "X" : "O";
        onPlay(newSquares, row, col);
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                {
                    squares.map((row, rowIndex) => (
                        <div key={rowIndex} className="board-row"> {
                            row.map((square, colIndex) => {
                                let color = null;
                                if (winner && exist([rowIndex, colIndex], squareWinner))
                                    color = 'red';

                                return (
                                    <Square key={colIndex} 
                                    value={square}
                                    color={color}
                                    onSquareClick = {() => handleClick(rowIndex, colIndex)}/>
                            )
                            })
                        }
                        </div>
                    ))
                }
            </div>
        </>
    );
}

function exist(a, b) {
    return b.some(arr => 
      arr.length === a.length && arr.every((value, index) => value === a[index])
    );
  }