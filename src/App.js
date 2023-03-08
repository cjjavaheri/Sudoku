import React, {useState} from 'react'
import './App.css'


let initial = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0],
]

function App() {

  const [board, setBoard] = useState(initial)

  function digitChange(event, i, j) {

    var sudokuBoard = JSON.parse(JSON.stringify(board))
    var digit = parseInt(event.target.value)

    if (digit >= 1 && digit <= 9) {
      sudokuBoard[i][j] = digit
    }
    setBoard(sudokuBoard)
  }

  function isValid(num, row, col) {
    var countRow = 0
    var countCol = 0
    var countSquare = 0
    var i

    if (num === 0) {
      return true
    }

    for (i = 0; i < 9; i++) {

        if (board[row][i] === num)
            countRow++

        if (board[i][col] === num)
            countCol++

    }

    for (i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            
            if (board[i + (3 * (Math.floor(row / 3)))][j + (3 * (Math.floor(col / 3)))] === num) {
                countSquare++
            }
        }
    }

    if (countRow > 1 || countCol > 1 || countSquare > 1) {
      console.log("num = ", num, "row = ", row, " col = ", col)
      console.log(countRow, countCol, countSquare)
      return false
    }
    return true;
  }

  function isFull() {

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return false
        }
      }
    }

    return true
  }

  function checkAnswers() {

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        
        if (!isValid(board[i][j], i, j)) {
          alert("Invalid board!")
          return false
        }
      }
    }
    if (isFull()) {
      alert("Completed!")
    }
    return true
  }

  return (
    <div className="App">
      <h3> Sudoku</h3>
      <button onClick = {checkAnswers} class="button">Check answers</button>
      <table>
        <tbody>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((r, i) => {
              return <tr key={i}>
                {
                  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((j, col) => {
                      return <td key={i+j}>
                        <input onChange={(event) => digitChange(event, i, j)} value={board[i][j] === 0 ? '' : board[i][j]}className="cell"/>
                      </td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
