
import React , {useState} from 'react'
import ReactDom from 'react-dom'
import './index.css'


//square

const Square = (props) =>{

  useState(null);
  //first value to get the state  and 2nd value to set the state
  return(
    <button 
      className="square"
      //alert (`square ${props.value} clicked`)}
      onClick={props.onClickEvent} >
    {props.value}
    </button>
  )
}
      
//board
const Board =()=>{
  const initialSquares=[
    null,null,null,
    null,null,null,
    null,null,null,
  ]
  const [squares , setSquares] = useState(initialSquares)
  const[xIsNext, setXIsNext]=useState(true)



  const handleClickEvent = (i) => {
      //make a copy of the squares state array
    const newSquares=[...squares]
    
    const winnerDeclared=Boolean(calculateWinner(newSquares))
    const squareFilled =Boolean(newSquares[i])
    if(winnerDeclared || squareFilled)
      return;
    
    
    //mutate the copy setting ith element to x
    newSquares[i]= xIsNext ? 'X ' :'0'
      //call the squares function with mutated copy
    setSquares(newSquares);
    
    //For the next stet to be zero
    setXIsNext(!xIsNext)
  }
 
  const renderSquare = (i) =>{
    return(
      <Square 
      value={squares[i]}
      onClickEvent ={() => handleClickEvent(i)}
      />
    )
  }

const win=calculateWinner(squares);

const status = win?
`Winner ${win}`:
`Next player: ${xIsNext ? 'X' : '0' }`

  return(
    <div style={{
      backgroundColor:'skyblue',
      margin:10,
      padding:20,
    }}>

    <div className="status">{status}</div>
    <div className="board-row">
    {renderSquare(0)}
    {renderSquare(1)}
    {renderSquare(2)}   </div>
    
    <div className="board-row">
    {renderSquare(3)}
    {renderSquare(4)}
    {renderSquare(5)}  </div>
    
    <div className="board-row">
    {renderSquare(6)}
    {renderSquare(7)}
    {renderSquare(8)}  </div>
    
    </div>
  )
}
const Game = () =>{
  return(
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  )
}
ReactDom.render(<Game />,document.getElementById("root"))

//Calculate Winner

function calculateWinner(squares){
  const lines=[
    [3,4,5] , [0,1,2] , [6,7,8], //rows
    [0,3,6] , [1,4,7] , [2,5,8], //coloumns
    [0,4,8] , [2 ,4 ,6],          //diagonals
  ];

  for(let line of lines)
  {
    const [a,b,c] =line

    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a]; //'x' or '0'
    }
    
  }
  return null;
}