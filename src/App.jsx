import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS, winnerCombos } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"


  function App() {

  const [board,setBoard] = useState(()=>{
    const boardFromStage = window.localStorage.getItem('board')
    if(boardFromStage) return JSON.parse(boardFromStage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X 
  })
  //null es que no hay ganador, false que hay empate
  const [winner, setWinner] = useState(null)


  //resetear el juego
   const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window
   }



  const updateBoard = (index)=>{

    //spread y rest operator

    // no actualizar esta posición si ya tiene algo
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index]= turn  // x u o
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }
    else if( checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Gato 😺</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((square,index)=>{
            return(
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X }>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O }>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
      
    </main>
  )
}

export default App
