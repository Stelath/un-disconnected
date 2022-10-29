import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

import MobileControls from "../components/mobileControls";

const ENDPOINT = "https://un-disconnected-server.onrender.com:10000";

const Controller = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [socket] = useState(socketIOClient(ENDPOINT));

    useEffect(() => {
      const roomCode = searchParams.get("joinCode");
      const name = searchParams.get("name");
      console.log(roomCode, name); // eslint-disable-line no-console
      socket.emit("join-room", {roomCode, name});
      return () => {
        // here is componentWillUnmount
        socket.disconnect()
      }
    }, []);

    const newInput = (input) => {
      socket.emit("input", {input: input});
    }
  
    return (
      <p>
        <MobileControls onNewInput={newInput}/>
      </p>
    );  
};

export default Controller;
