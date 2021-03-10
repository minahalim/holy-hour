import React, { useState, useRef } from "react";

import "./App.css";
import logo from "./logo.png";
import bottomLogo from "./logo1.png";
import churchBellAudio from "./church-bell.ogg";

const audio = new Audio();
audio.src = churchBellAudio;

const screens = [
  {
    title: "Opening Prayer",
    duration: 300,
  },
  {
    title: "Spiritual Reading",
    duration: 900,
  },
  {
    title: "Silent Prayer",
    duration: 1200,
  },
  {
    title: "Intercession",
    duration: 900,
  },
  {
    title: "Thanksgiving",
    duration: 300,
  },
];

function App() {
  const interval = useRef(null);
  const [currentTime, setCurrentTime] = useState(screens[0].duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleOnStart = () => {
    setIsStarted(true);
    clearInterval(interval.current);

    setIsPlaying(true);

    interval.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime - 1;
        
        if (newTime > 0) {
          return newTime;
        } else {
          handleOnCountdownEnd();
          return null;
        }
      });
    }, 1000);
  };

  const handleonPlayPause = () => {
    clearInterval(interval.current);

    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      handleOnStart();
    }
  };

  const handleOnCountdownEnd = () => {
    clearInterval(interval.current);

    const nextScreen = currentScreen + 1;

    setCurrentScreen(nextScreen);
    setCurrentTime(screens[nextScreen].duration);
    handleOnStart();

    if (nextScreen <= screens.length - 1) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {}).catch((error) => {});
      }
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="main">
      <div className="wrapper">
        <img src={logo} alt="" className="logo" />
        <img src={bottomLogo} alt="" className="logo-bottom" />
        {
          <>
            {isComplete ? (
              "Holy Hour Completed!"
            ) : (
              <div className="timer-wrapper" onClick={handleonPlayPause}>
                {isStarted && (
                  <>
                    <div className="heart">{screens[currentScreen].title}</div>
                    <br />
                    <div className="timer">
                      {!isPlaying && <span className="play" />}
                      {new Date(currentTime * 1000).toISOString().substr(11, 8)}
                    </div>
                  </>
                )}
              </div>
            )}
            {!isStarted && (
              <div className="start-button" onClick={handleOnStart}>
                Start
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

export default App;
