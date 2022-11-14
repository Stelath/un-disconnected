import React from "react";
import ReactNipple from "./reactNipple";

import "../styles/mobileControls.css";

type MobileControlsProps = {
  onNewInput: (input: string) => void;
};

const MobileControls = ({ onNewInput }: MobileControlsProps) => {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <div>
      <ReactNipple
        options={{ mode: "dynamic", position: { top: "50%", left: "25%" } }}

        style={{
          width: width,
          height: height,
        }}

        onMove={(evt: any, data: any) => {
          if (data.direction && data.direction.angle) {
            onNewInput(data.direction.angle);
          }
        }}
      />
      <button id="a" onClick={() => onNewInput("a")}>
        A
      </button>
      <button id="b" onClick={() => onNewInput("b")}>
        B
      </button>
    </div>
  );
};

export default MobileControls;
