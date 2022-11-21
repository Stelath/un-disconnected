import "./App.css";
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { useSearchParams } from "react-router-dom";

const ENDPOINT = `http://${window.location.host.split(':')[0]}:4001`; // this is where we are connecting to with sockets

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
 
 
// const initialState = {
//   rows: emptyRows(),
//   snake1: { direction: STOP, body: [{x: 1, y: 1}], alive: 1 },
//   snake2: { direction: STOP, body: [{x: WIDTH - 2, y: 1}], alive: 1 },
//   snake3: { direction: STOP, body: [{x: 1, y: HEIGHT - 2}], alive: 1 },
//   snake4: { direction: STOP, body: [{x: WIDTH - 2, y: HEIGHT - 2}], alive: 1 },
//   food1: {x:7, y:7},
//   food2: {x:9, y:14},
//   food3: {x:14, y:9},
//   speed: 100,
//   aliveSnakes: 4,
// };

const WrappedComponent = props => {
  const [joinCode] = useSearchParams();

  return <SnakeGame joinCode={joinCode.get('joinCode')} {...props} />
}


class SnakeGame extends Component {
 constructor(props) {
   super(props);

   this.roomCode = props.joinCode;
   this.state = {
     rows: emptyRows(),
     snake1: { direction: DOWN, body: [{x: 1, y: 1}], alive: 1, color:"snake1" },
     snake2: { direction: RIGHT, body: [{x: WIDTH - 2, y: 1}], alive: 1, color:"snake2"  },
     snake3: { direction: LEFT, body: [{x: 1, y: HEIGHT - 2}], alive: 1, color:"snake3"  },
     snake4: { direction: UP, body: [{x: WIDTH - 2, y: HEIGHT - 2}], alive: 1, color:"snake4"  },
     food1: {x:WIDTH-2, y:7},  //7,7
     food2: {x:WIDTH-2, y:14}, //9,14
     food3: {x:WIDTH-2, y:9}, //14,9
     speed: 100,
     aliveSnakes: 4,
   };
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
  killSnake = (selfSnake, otherSnake) => {
   var rowsCopy =[...this.state.rows]
   selfSnake.direction = STOP;
   selfSnake.alive = 0;
   for (let i = 0; i < selfSnake.body.length; i++) {
     if (i == 0){
       rowsCopy[selfSnake.body[i].x][selfSnake.body[i].y] = otherSnake;
     }else{
       rowsCopy[selfSnake.body[i].x][selfSnake.body[i].y] = "grid-item";
     }
   }
   this.setState({rows:rowsCopy});
 }
 
 isCollideSelf = (selfSnake) => {
   if(selfSnake.alive){
     let head = { ...selfSnake.body[selfSnake.body.length - 1] };
    
     for (let i = 0; i < selfSnake.body.length - 3; i++) {
       // checking itself
       if (head.x === selfSnake.body[i].x && head.y === selfSnake.body[i].y) {
         this.killSnake(selfSnake,"grid-item");
         this.gameOver();
       }
     }
 }
 };
 
 isCollideOthers = (selfSnake, snak1, snak2, snak3) => {
   let selfHead = { ...selfSnake.body[selfSnake.body.length - 1] };
   if(selfSnake.alive){
   if(snak1.alive){
     for (let i = 0; i < snak1.body.length; i++) {
       if (selfHead.x === snak1.body[i].x && selfHead.y === snak1.body[i].y) {
         this.killSnake(selfSnake,snak1.color);
 
         this.gameOver();
       }
     }
   }
   if(snak2.alive){
     for (let i = 0; i < snak2.body.length; i++) {
       if (selfHead.x === snak2.body[i].x && selfHead.y === snak2.body[i].y) {
 
         this.killSnake(selfSnake,snak2.color);
        this.gameOver();
       }
     }
   }
   if(snak3.alive){
    
     for (let i = 0; i < snak3.body.length; i++) {
       if (selfHead.x === snak3.body[i].x && selfHead.y === snak3.body[i].y) {
         this.killSnake(selfSnake,snak3.color);
         this.gameOver(); //ending state
       }
     }
   }
 }
 return;
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
 
 changeDirection = (snake, keyCode) => {
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
     switch(snake) {
        case this.state.snake1:
          this.setState({snake1: {...snake, direction: direction}});
          break;
        case this.state.snake2:
          this.setState({snake2: {...snake, direction: direction}});
          break;
        case this.state.snake3:
          this.setState({snake3: {...snake, direction: direction}});
          break;
        case this.state.snake4:
          this.setState({snake4: {...snake, direction: direction}});
          break;
        default:
          console.log("NO SNAKE FOUND");
          break;
     }
 }
};
  update() {
   let newRows = emptyRows();
   if(this.state.snake1.alive){
     this.state.snake1.body.forEach(element => newRows[element.x][element.y] = 'snake1')
     this.isEaten(this.state.snake1);
   } if(this.state.snake2.alive){
     this.state.snake2.body.forEach(element => newRows[element.x][element.y] = 'snake2')
     this.isEaten(this.state.snake2);
   } if(this.state.snake3.alive){
     this.state.snake3.body.forEach(element => newRows[element.x][element.y] = 'snake3')
     this.isEaten(this.state.snake3);
   } if(this.state.snake4.alive){
     this.state.snake4.body.forEach(element => newRows[element.x][element.y] = 'snake4')
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
    this.socket = socketIOClient(ENDPOINT);
    this.socket.emit("join-room", {roomCode: this.roomCode, name: ""})
    this.socket.on("new-input", data => {
        for(let i = 0; i < data.length; i++) {
          this.setDirections(data[i]);
          switch(i) {
            case 0:
              this.changeDirection(this.state.snake1, data[i]);
              break;
            case 1:
              this.changeDirection(this.state.snake2, data[i]);
              break;
            case 2:
              this.changeDirection(this.state.snake3, data[i]);
              break;
            case 3:
              this.changeDirection(this.state.snake4, data[i]);
              break;
            default:
              break;
          }
        }
    });

 var intervalID = setInterval(this.moveSnake, 100);    
}   
 
moveSnake = () => {
 if(this.state.snake1.alive){
   let snakeCopy1 = [...this.state.snake1.body];
   let head1  =  {...snakeCopy1[snakeCopy1.length-1]};
   switch (this.state.snake1.direction) {
       case LEFT:  head1.y += -1; break;   
       case UP:    head1.x += -1; break;
       case RIGHT: head1.y += 1;  break;
       case DOWN:  head1.x += 1;  break;
       default: return;
   }
   /* keep the value within range of 0 to HEIGHT */
   head1.x += HEIGHT * ((head1.x<0)-(head1.x>=HEIGHT));
   head1.y += WIDTH * ((head1.y<0)-(head1.y>=WIDTH));
   snakeCopy1.push(head1);
 
   snakeCopy1.shift();
   this.state.snake1.body = snakeCopy1;
 }
 if(this.state.snake2.alive){
   let snakeCopy2 = [...this.state.snake2.body];
   let head2  =  {...snakeCopy2[snakeCopy2.length-1]};
   switch (this.state.snake2.direction) {
       case LEFT:  head2.y += -1; break;   
       case UP:    head2.x += -1; break;
       case RIGHT: head2.y += 1;  break;
       case DOWN:  head2.x += 1;  break;
       default: return;
   }
   /* keep the value within range of 0 to HEIGHT */
   head2.x += HEIGHT * ((head2.x<0)-(head2.x>=HEIGHT));
   head2.y += WIDTH * ((head2.y<0)-(head2.y>=WIDTH));
   snakeCopy2.push(head2);
 
   snakeCopy2.shift();
   this.state.snake2.body = snakeCopy2;
 }
 if(this.state.snake4.alive){
   let snakeCopy4 = [...this.state.snake4.body];
   let head4  =  {...snakeCopy4[snakeCopy4.length-1]};
   switch (this.state.snake4.direction) {
       case LEFT:  head4.y += -1; break;   
       case UP:    head4.x += -1; break;
       case RIGHT: head4.y += 1;  break;
       case DOWN:  head4.x += 1;  break;
       default: return;
   }
   /* keep the value within range of 0 to HEIGHT */
   head4.x += HEIGHT * ((head4.x<0)-(head4.x>=HEIGHT));
   head4.y += WIDTH * ((head4.y<0)-(head4.y>=WIDTH));
   snakeCopy4.push(head4);
 
   snakeCopy4.shift();
   this.state.snake4.body = snakeCopy4;
 }
 if(this.state.snake3.alive){
   let snakeCopy3 = [...this.state.snake3.body];
   let head3  =  {...snakeCopy3[snakeCopy3.length-1]};
   switch (this.state.snake3.direction) {
       case LEFT:  head3.y += -1; break;   
       case UP:    head3.x += -1; break;
       case RIGHT: head3.y += 1;  break;
       case DOWN:  head3.x += 1;  break;
       default: return;
   }
   /* keep the value within range of 0 to HEIGHT */
   head3.x += HEIGHT * ((head3.x<0)-(head3.x>=HEIGHT));
   head3.y += WIDTH * ((head3.y<0)-(head3.y>=WIDTH));
   snakeCopy3.push(head3);
 
   snakeCopy3.shift();
   this.state.snake3.body = snakeCopy3;
 }
 //this.setState({snake1:{direction:this.state.snake1.direction, body: [...snakeCopy1], alive: this.state.snake1.alive}});
 this.update();
 
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
      
     </div>
   );
 }
}
 
// class Countdown extends Component{
//   constructor(){
//     super();
//     this.state = {countdown:5};
  
//   }
//    componentDidMount(){
//     var intervalID = setInterval(() => {
//       this.setState({countdown:this.state.countdown-1});
//       if(this.state.countdown === 1){
       //console.log("HERHEHRHERHEEHRREHRHEH")
//         intervalID.clearInterval();
//       }
//     }, 1000)
//    }
 //   render(){
//     return(
//       <>
//       {this.state.countdown}
//       </>
//     )
//   }
// }
 
export default WrappedComponent;
