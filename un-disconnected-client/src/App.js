import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Mobile from "./Pages/mobile";
import CreateRoom from './Pages/createRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="mobile" element={<Mobile />} />
        <Route path="createroom" element={<CreateRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
