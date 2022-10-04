import React, { useState } from 'react'
import './TicTacToe.css'

const TicTacToe = () => {
    const [turn, setTurn] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();

    const checkForWinner = (squares) => {
        const combos = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            vertical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ) {
                    // Do nothing
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    }

    const handleClick = (num) => {
        if (cells[num] !== '') {
            alert('OOPS! This spot is already taken...');
            return;
        }
        let squares = [...cells];
        if (turn === 'X') {
            squares[num] = 'X';
            setTurn('O');
        } else {
            squares[num] = 'O';
            setTurn('X');
        }

        checkForWinner(squares);
        setCells(squares)
    };

    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    };

  return (
    <div className='container'>
        <h1>Tic Tac Toe</h1>
        <table>
            <tbody>
                <tr>
                    <Cell num={0}/>
                    <Cell num={1}/>
                    <Cell num={2}/>
                </tr>
                <tr>
                    <Cell num={3}/>
                    <Cell num={4}/>
                    <Cell num={5}/>
                </tr>
                <tr>
                    <Cell num={6}/>
                    <Cell num={7}/>
                    <Cell num={8}/>
                </tr>
            </tbody>
        </table>
            {winner ? null : <h2>{turn}'s turn to play</h2>}
            {winner && (
                <div className="winner">
                    <h1>{winner}'s win!</h1>
                    <button onClick={() => handleRestart()}>Play Again</button>
                </div>
            )} 
    </div>
  )
}

export default TicTacToe