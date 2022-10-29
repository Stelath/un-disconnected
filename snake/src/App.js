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
const HEIGHT = 10;
const WIDTH = 20;

const LEFT  = 37; 
const UP    = 38;
const RIGHT = 39; 
const DOWN  = 40;
const STOP  = 32;

const emptyRows = () =>
  [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_) => "grid-item"));

const getRandomFood = () => {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
};

const initialState = {
  rows: emptyRows(),
  snake1: { direction: STOP, body: [{x: 1, y: 1}], alive: 1 },
  snake2: { direction: STOP, body: [{x: WIDTH - 2, y: 1}], alive: 1 },
  snake3: { direction: STOP, body: [{x: 1, y: HEIGHT - 2}], alive: 1 },
  snake4: { direction: STOP, body: [{x: WIDTH - 2, y: HEIGHT - 2}], alive: 1 },
  food: getRandomFood(),
  speed: 100,
  aliveSnakes: 4,
};


class SnakeGame extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.setState(aliveSnakes  this.state.snake1.alive + this.state.snake2.alive + this.state.snake3.alive + this.state.snake4.alive);

  }

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

  killSnake = (selfSnake) => {
    selfSnake.direction = STOP;
    selfSnake.alive = 0;
    for (let i = 0; i < selfSnake.body.length; i++) {
      this.state.rows[selfSnake.body[i].x][selfSnake.body[i].y] = "grid-item"; 
    }
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

  isCollidingOthers = (selfSnake, snak1, snak2, snak3) => {
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
    alert(`game over: someone won`); //TODO: nmake the wirnner win
    }
  }

  changeDirection = (snake, { keyCode }) => {
    let direction = snake.direction;
    if(snake.alive===1){
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
          direction = STOP;
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
    } if(this.state.snake.alive){
      this.state.snake2.forEach(element => newRows[element.x][element.y] = 'snake2')
    } if(this.state.snake.alive){
      this.state.snake3.forEach(element => newRows[element.x][element.y] = 'snake3')
    } if(this.state.snake.alive){
      this.state.snake4.forEach(element => newRows[element.x][element.y] = 'snake4')
    }
    newRows[this.state.food.x][this.state.food.y] = 'food';
    this.setState({rows: newRows});
}

componentDidUpdate() {
  this.isCollapsed();
  this.isEaten();
}

  render() {
    const displayRows = this.state.rows.map((row, i) =>
      row.map((value, j) => <div name={`${i}=${j}`} className={value} />)
    );
    return (
      <div className="a">
        <h1> Snake v0.1.1</h1>

        {/* <li>press "space" to pause the game.</li>
              <li>press "arrow keys" to change direction/ unpause.</li> */}

        <div className="snake-container">
          <div className="grid">{displayRows}</div>
        </div>
      </div>
    );
  }
}

export default App;
