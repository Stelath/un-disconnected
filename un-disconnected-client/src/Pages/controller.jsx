import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import MobileControls from "../components/mobileControls";

const ENDPOINT = "http://127.0.0.1:4001";

const Controller = ({roomCode}) => {
    const [response, setResponse] = useState("");

    const socket = socketIOClient(ENDPOINT);
    // useEffect(() => {
      
    //   socket.on("FromAPI", data => {
    //     setResponse(data);
    //   });
    // }, []);

    const newInput = (input) => {
      socket.emit(`${roomCode}/${input}`);
    }
  
    return (
      <p>
        <MobileControls onNewInput={newInput}/>
      </p>
    );  
};

export default Controller;
