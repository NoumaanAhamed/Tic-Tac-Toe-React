import { useState } from "react";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {}

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          square={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div className="game-info">
        <ol>{}</ol>
      </div>
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

function Board({ xIsNext, square, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [square, setSquare] = useState(Array(9).fill(null));

  function handleClick(i) {
    //! stops the clicks here after winning
    if (square[i] || calculateWinner(square)) return;
    const nextSquares = square.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquare(nextSquares);
    // setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  //!calling handleClick directly ==> re-render infinitely
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square value={square[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square value={square[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={square[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={square[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square value={square[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={square[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
