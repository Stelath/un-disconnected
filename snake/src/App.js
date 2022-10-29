import "./App.css";
import React, { Component } from "react";

function App() {
  return (
    <div>
      <SnakeGame/>
    </div>
  );
}

//move this to snake?
const HEIGHT = 20;
const WIDTH = 20;
// 10 x 10
const LEFT  = '0010'; 
const UP    = '1000';
const RIGHT = '0001'; 
const DOWN  = '0100';
const STOP  = '0000';

const emptyRows = () =>
  [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_) => "grid-item"));
 


const initialState = {
  rows: emptyRows(),
  snake1: { direction: STOP, body: [{x: 1, y: 1}], alive: 1 },
  snake2: { direction: STOP, body: [{x: WIDTH - 2, y: 1}], alive: 1 },
  snake3: { direction: STOP, body: [{x: 1, y: HEIGHT - 2}], alive: 1 },
  snake4: { direction: STOP, body: [{x: WIDTH - 2, y: HEIGHT - 2}], alive: 1 },
  food1: {x:7, y:7},
  food2: {x:9, y:14},
  food3: {x:14, y:9},
  speed: 100,
  aliveSnakes: 4,
  countdown: " ",
};


class SnakeGame extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.setState({aliveSnakes: this.state.snake1.alive + this.state.snake2.alive + this.state.snake3.alive + this.state.snake4.alive});
    this.state.rows[1][1] = "snake1";
    this.state.rows[WIDTH-2][1] = "snake2";
    this.state.rows[1][HEIGHT-2] = "snake3";
    this.state.rows[WIDTH-2][HEIGHT-2] = "snake4";
  }

  getRandomFood = () => {
    var result = {x:0, y:0};
    do {
       result = {x: Math.floor(Math.random()*WIDTH), y: Math.floor(Math.random()*HEIGHT)}
    } while (this.state.rows[result.x][result.y] !== "grid-item");
    return result;
  };
  
  isEaten = (selfSnake) =>{
    let head  =  {...selfSnake.body[selfSnake.body.length-1]};
    if ((head.x === this.state.food1.x) &&(head.y === this.state.food1.y)) {
        selfSnake.body.push(head);
        this.setState({food1: this.getRandomFood()});
    } 
    if ((head.x === this.state.food2.x) &&(head.y === this.state.food2.y)) {
      selfSnake.body.push(head);
      this.setState({food2: this.getRandomFood()});
  } 
  if ((head.x === this.state.food3.x) &&(head.y === this.state.food3.y)) {
    selfSnake.body.push(head);
    this.setState({food3: this.getRandomFood()});
} 
  }
  
  killSnake = (selfSnake) => {
    var rowsCopy =[...this.state.rows]
    selfSnake.direction = STOP;
    selfSnake.alive = 0;
    for (let i = 0; i < selfSnake.body.length; i++) {
      rowsCopy[selfSnake.body[i].x][selfSnake.body[i].y] = "grid-item"; 
    }
    this.setState({rows:rowsCopy});
  }

  isCollideSelf = (selfSnake) => {
    if(selfSnake.alive){
      let head = { ...selfSnake.body[selfSnake.body.length - 1] };
      
      for (let i = 0; i < selfSnake.body.length - 3; i++) {
        // checking itself
        if (head.x === selfSnake.body[i].x && head.y === selfSnake.body[i].y) {
          this.killSnake(selfSnake);
          this.gameOver();
        }
      }
  }
  };

  isCollideOthers = (selfSnake, snak1, snak2, snak3) => {
    let selfHead = { ...selfSnake.body[selfSnake.body.length - 1] };
    if(snak1.alive){
      for (let i = 0; i < selfHead; i++) {
        if (selfHead.x === snak1.body[i].x && selfHead.y === snak1.body[i].y) {
          this.killSnake(selfSnake);
          this.gameOver();
        }
      }
    }
    if(snak2.alive){
      for (let i = 0; i < selfHead; i++) {
        if (selfHead.x === snak2.body[i].x && selfHead.y === snak2.body[i].y) {
          this.killSnake(selfSnake);
         this.gameOver();
        }
      }
    }
    if(snak3.alive){
      for (let i = 0; i < selfHead; i++) {
        if (selfHead.x === snak3.body[i].x && selfHead.y === snak3.body[i].y) {
          this.killSnake(selfSnake);
          this.gameOver(); //ending state
        }
      }
    }
  };

  gameOver = () => {
    if(this.state.aliveSnakes === 1){
    alert(`game over: someone won`); // TODO nmake the wirnner win
    }
  }

  setDirections = (intVal) => {
    var binary = intVal.toString(2);
    
    this.changeDirection(this.state.snake1,binary.slice(0,5));
    this.changeDirection(this.state.snake2,binary.slice(4,9));
    this.changeDirection(this.state.snake3,binary.slice(9,13));
    this.changeDirection(this.state.snake4,binary.slice(13,16));
    
  }

  changeDirection = (snake, { keyCode }) => {
    let direction = snake.direction;
    if(snake.alive===1&&snake.direction !== STOP){
      switch (keyCode) {
        case LEFT:
          direction = direction === RIGHT ? RIGHT : LEFT;
          break;
        case RIGHT:
          direction = direction === LEFT ? LEFT : RIGHT;
          break;
        case UP:
          direction = direction === DOWN ? DOWN : UP;
          break;
        case DOWN:
          direction = direction === UP ? UP : DOWN;
          break;
        case STOP:
          
          break;
        default:
          break;
      }
      snake.setState({
        direction: direction,
      });
  }
};
  
  update() {
    let newRows = emptyRows(); 
    if(this.state.snake.alive){
      this.state.snake1.forEach(element => newRows[element.x][element.y] = 'snake1')
      this.isEaten(this.state.snake1);
    } if(this.state.snake.alive){
      this.state.snake2.forEach(element => newRows[element.x][element.y] = 'snake2')
      this.isEaten(this.state.snake2);
    } if(this.state.snake.alive){
      this.state.snake3.forEach(element => newRows[element.x][element.y] = 'snake3')
      this.isEaten(this.state.snake3);
    } if(this.state.snake.alive){
      this.state.snake4.forEach(element => newRows[element.x][element.y] = 'snake4')
      this.isEaten(this.state.snake4);
    }
    newRows[this.state.food1.x][this.state.food1.y] = 'food';
    newRows[this.state.food2.x][this.state.food2.y] = 'food';
    newRows[this.state.food3.x][this.state.food3.y] = 'food';
    this.setState({rows: newRows});
}  

componentDidUpdate() {
  this.isCollideSelf(this.state.snake1);
  this.isCollideOthers(this.state.snake1,this.state.snake2,this.state.snake3,this.state.snake4);
  this.isCollideSelf(this.state.snake2);
  this.isCollideOthers(this.state.snake2,this.state.snake3,this.state.snake4,this.state.snake1);
  this.isCollideSelf(this.state.snake3);
  this.isCollideOthers(this.state.snake3,this.state.snake4, this.state.snake1, this.state.snake2);
  this.isCollideSelf(this.state.snake4);
  this.isCollideOthers(this.state.snake4,this.state.snake1,this.state.snake2,this.state.snake3);
  this.isEaten(this.state.snake1);
  this.isEaten(this.state.snake2);
  this.isEaten(this.state.snake3);
  this.isEaten(this.state.snake4);
}

startMovement = () =>{
  
  this.setState({snake1:{direction: DOWN, body: this.state.snake1.body, alive: this.state.snake1.alive}})
  this.setState({snake2:{direction: LEFT, body: this.state.snake2.body, alive: this.state.snake2.alive}})
  this.setState({snake3:{direction: RIGHT, body: this.state.snake3.body, alive: this.state.snake3.alive}})
  this.setState({snake4:{direction: UP, body: this.state.snake4.body, alive: this.state.snake4.alive}})
}

componentDidMount() {
  setInterval(this.moveSnake, 500);
  document.onkeydown = this.changeDirection;
  document.title = "snake-game";
}

moveSnake = (selfSnake) => {
  let snakeCopy = [...selfSnake.body];

  let head  =  {...snakeCopy[snakeCopy.length-1]};
  switch (selfSnake.direction) {
      case LEFT:  head.y += -1; break;    
      case UP:    head.x += -1; break;
      case RIGHT: head.y += 1;  break;
      case DOWN:  head.x += 1;  break;
      default: return;
  }
  /* keep the value within range of 0 to HEIGHT */
  head.x += HEIGHT * ((head.x<0)-(head.x>=HEIGHT));
  head.y += WIDTH * ((head.y<0)-(head.y>=WIDTH));
  
  snakeCopy.push(head); 
  snakeCopy.shift()
  selfSnake.body = snakeCopy;
  this.update(); 
}   

countdownFunction = (num) => {
  if(num === 3){
    this.setState({countdown:"3"});
  }else if (num === 2){
    this.setState({countdown:"2"});
  } else if (num === 1) {
    this.setState({countdown:"1"});
  } else if (num === 0) {
    this.setState({countdown:"Go!"});
  } 
}

  render() {
    const displayRows = this.state.rows.map((row, i) =>
      row.map((value, j) => <div name={`${i}=${j}`} className={value} />)
    );
    return (
      <div>

        {/* <li>press "space" to pause the game.</li>
              <li>press "arrow keys" to change direction/ unpause.</li> */}

        <div className="snake-container">
          <div className="grid">{displayRows}</div>
        </div>

        
        {/* {this.startMovement()} */}
        

      </div>
    );
  }
}

export default App;
