import moment from "moment";
import React, { useState } from "react";
import ReactMomentCountDown from "react-moment-countdown";

import "./App.css";

const screens = [
  {
    title: "Opening Prayer",
    duration: "5 minutes",
  },
  {
    title: "Spiritual Reading",
    duration: "15 minutes",
  },
  {
    title: "Silent Prayer",
    duration: "20 minutes",
  },
  {
    title: "Intercession",
    duration: "15 minutes",
  },
  {
    title: "Thanksgiving",
    duration: "5 minutes",
  },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [started, setStarted] = useState(0);
  const [allDone, setAllDone] = useState(0);

  const start = (screen = 0) => {
    const duration = moment().clone();
    const newTime = screens[screen].duration.split(" ");

    setStarted(
      duration.add(+newTime[0], newTime[1]).format("YYYY-MM-DD HH:mm:ss")
    );
  };

  const handleOnCountdownEnd = () => {
    const nextScreen = currentScreen + 1;
    if (nextScreen <= screens.length - 1) {
      setCurrentScreen(nextScreen);
      setStarted(0);
      start(nextScreen);
    } else {
      setAllDone(1);
    }
  };

  return (
    <div className="main">
      <div className="wrapper">
        {(allDone && "Holy Hour Completed!") || <>{(started && (
          <>
            <div className="heart">
              {screens[currentScreen].title}
            </div>
            <br />
            <div className="timer">
            <ReactMomentCountDown
              toDate={started}
              onCountdownEnd={handleOnCountdownEnd}
              sourceFormatMask="YYYY-MM-DD HH:mm:ss"
            />
            </div>
          </>
        )) ||
          null}
        <br />
        {started === 0 && (
          <div className="start-button" onClick={() => start(0)}>
            Start
          </div>
        )}</>}
      </div>
    </div>
  );
}

export default App;
