import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Join from "./Pages/join";
import CreateRoom from './Pages/createRoom';
import Controller from './Pages/controller';
import Game from './Pages/game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="game" element={<Game />}/>
        <Route path="controller" element={<Controller />} />
        <Route path="join" element={<Join />} />
        <Route path="createroom" element={<CreateRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
