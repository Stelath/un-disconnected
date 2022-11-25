import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import socket from "../service/socket";

import MobileControls from "../components/mobileControls";

const Controller = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
      socket.connect();
      const roomCode = searchParams.get("joinCode");
      const name = searchParams.get("name");
      console.log(roomCode, name); // eslint-disable-line no-console
      socket.emit("join-room", {roomCode, name});
      return () => {
        // here is componentWillUnmount
        socket.disconnect()
      }
    });

    const newInput = (input: string): void => {
      // console.log(input); // eslint-disable-line no-console
      socket.emit("input", {input: input, roomCode: searchParams.get("joinCode")}); // eslint-disable-line no-console
    }
  
    return (
      <p>
        <MobileControls onNewInput={newInput}/>
      </p>
    );  
};

export default Controller;
