import React from "react";

export default function Square({value, onSquareClick, color}) {
  return (
    <div className={`square ${color}`}
        onClick={onSquareClick}>
        {value}
    </div>
    );
}
