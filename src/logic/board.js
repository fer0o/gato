
import { winnerCombos } from "../constants"
export const checkWinner = (boardToCheck) => {
    //revisar todas las combinaciones ganadoras
    //para ver si ganó X u O
    for(const combo of winnerCombos){
      const [a, b, c]= combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      )
      {
        return boardToCheck[a]
      }
    }
    // no hay ganador
    return null
  }


  export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
   }