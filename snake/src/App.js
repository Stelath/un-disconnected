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
const  HEIGHT = 20;
const  WIDTH  = 20;

const initialState = {
  rows:1 em1, 1
  snake2: [WIDTH-2],
  snake3: [],
  snake4: [],
  snake: [getRandom()],
  food: getRandom(),
  direction: STOP,
  speed: 100,


};

class SnakeGame extends Component{
  constructor(props){
    super(props)
    
    this.state = initialState;
  }
} ;


export default App;
