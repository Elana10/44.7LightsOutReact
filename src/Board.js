import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn =0.35}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values    
    let initialBoard = Array.from({length: nrows}).map(() => {
                  return Array.from({length:ncols}).map(() =>{
                    const cell = Math.random() 
                    return (cell < chanceLightStartsOn);
                  })
                })

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => {
        return row.map(value => value)
      })      

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;

    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if(hasWon()){
    return <div>You Win!</div>
  }

  // make table board
  // TODO

  return (
    <table>
      {board.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((cell, cellIdx) => { 
            let coord = `${rowIdx}-${cellIdx}`
            return (
              <Cell 
                flipCellsAroundMe ={() => flipCellsAround(coord)} 
                isLit={cell} 
                key={coord}
              />);
            })}
        </tr>
      ))}  
    </table>
  )
}

export default Board;
