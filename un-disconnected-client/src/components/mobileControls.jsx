import React from "react";

import '../styles/mobileControls.css';

import ReactNipple from "react-nipple";

const MobileControls = ({onNewInput}) => {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <div>
      <ReactNipple
        // supports all nipplejs options
        // see https://github.com/yoannmoinet/nipplejs#options
        options={{ mode: "dynamic", position: { top: "50%", left: "25%" } }}
        // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
        style={{
          width: width,
          height: height,
          // if you pass position: 'relative', you don't need to import the stylesheet
        }}
        // all events supported by nipplejs are available as callbacks
        // see https://github.com/yoannmoinet/nipplejs#start
        onMove={onNewInput}
      />
      <button id="a" onClick={onNewInput}>A</button>
      <button id="b" onClick={onNewInput}>B</button>
    </div>
  );
};

export default MobileControls;
