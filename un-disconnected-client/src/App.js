import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Mobile from "./Pages/mobile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route index element={<Home />} />
        <Route path="mobile" element={<Mobile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
