import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import MobileControls from "../components/mobileControls";

const ENDPOINT = "http://127.0.0.1:4001";

const Controller = (props) => {
    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }, []);

    const newInput = (evt, data) => {
      console.log(evt, data)
    }
  
    return (
      <p>
        <MobileControls onNewInput={newInput}/>
      </p>
    );  
};

export default Controller;
