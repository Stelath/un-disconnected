import './App.css';
import React, {Component} from "react";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
//move this to snake?
const  HEIGHT = 20;
const  WIDTH  = 20;

const emptyRows = () => [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_)=> 'grid-item'));

const getRandomFood = () => {
  return  { 
      x: Math.floor(Math.random() *WIDTH),
      y: Math.floor(Math.random() *HEIGHT) 
  }
}

const initialState = {
  rows: emptyRows(),
  snake1: {direction: STOP, x:1, y:1},
  snake2: {direction: STOP, x:WIDTH-2, y:1},
  snake3: {direction: STOP, x:1, y:HEIGHT-2},
  snake4: {direction: STOP, x:WIDTH-2, y:HEIGHT-2},
  food1: getRandomFood(),
  speed: 100,
};

//  isCollapsed = (selfSnake) => {
//         let snake = selfSnake;
//         let head  = {...snake[snake.length-1]} 
//         for (let i=0; i<snake.length-3; i++) {// checking itself
//             if ((head.x === snake[i].x) &&(head.y === snake[i].y)) {
//                 this.setState(initialState);
//                 alert(`game over: ${snake.length*10}`)
//             }
//         }
//     }

isCollideSelf = (selfSnake) => {
        let head  = {...selfSnake[selfSnake.length-1]} 
        for (let i=0; i<selfSnake.length-3; i++) {// checking itself
            if ((head.x === selfSnake[i].x) &&(head.y === selfSnake[i].y)) {
                this.setState(initialState);
                alert(`game over: ${selfSnake.length*10}`)//ending state 
            }
        }
  }
isCollidingOthers = (selfSnake, snak1, snak2, snak3) => {
  let selfHead = {...selfSnake[selfSnake.length-1]}
  for (let i = 0; i<selfHead; i++){
    if((selfHead.x === snak1[i].x) && (selfHead.y === snak1[i].y)){
      this.setState(initialState);
      alert(`game over: ${selfSnake.length*10}`)//ending state 
    }
  }
  for (let i = 0; i<selfHead; i++){
    if((selfHead.x === snak2[i].x) && (selfHead.y === snak2[i].y)){
      this.setState(initialState);
      alert(`game over: ${selfSnake.length*10}`)//ending state 
    }
  }
  for (let i = 0; i<selfHead; i++){
    if((selfHead.x === snak3[i].x) && (selfHead.y === snak3[i].y)){
      this.setState(initialState);
      alert(`game over: ${selfSnake.length*10}`)//ending state 
    }
  }
}

changeDirection = ({keyCode}) => { 
  let direction = this.state.direction;
  switch (keyCode) {
      case LEFT:
          direction = (direction === RIGHT)? RIGHT: LEFT;
          break;
      case RIGHT:
          direction = (direction === LEFT)? LEFT: RIGHT;
          break;
      case UP:
          direction = (direction === DOWN)? DOWN: UP;
          break;
      case DOWN:
          direction = (direction === UP)? UP: DOWN;
          break;
      case STOP:
          direction = STOP;
          break;
      default:
          break;
  }
  this.setState({
      direction: direction
  });
}

render() {
  const displayRows = this.state.rows.map((row, i) => row.map((value, j) =>  <div name={`${i}=${j}`} className={value} />))
  return (
      <div className="a">
          <h1> Snake  v0.1.1</h1>
          
              {/* <li>press "space" to pause the game.</li>
              <li>press "arrow keys" to change direction/ unpause.</li> */}
         
          <div className="snake-container">
              <div className="grid">{displayRows}</div>
          </div>
      </div>
  )    
}

class SnakeGame extends Component{
  constructor(props){
    super(props)
    
    this.state = initialState;
  }
} ;



export default App;
