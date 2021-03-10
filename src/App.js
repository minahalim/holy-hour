import React, { useState, useRef, useEffect } from "react";

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
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(
    screens[currentScreen].duration
  );

  const handleOnStart = () => {
    setIsStarted(true);
    setIsPlaying(true);

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch((error) => {});
    }

    interval.current = setInterval(() => {
      setCurrentDuration((prevDuration) => prevDuration - 1);
    }, 1000);
  };

  const handleonPlayPause = () => {
    clearInterval(interval.current);
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      handleOnStart();
    }
  };

  useEffect(() => {
    if (currentDuration === 0) {
      clearInterval(interval.current);
      const newScreen = currentScreen + 1;
      if (newScreen <= screens.length - 1) {
        setCurrentScreen(newScreen);
        setCurrentDuration(screens[newScreen].duration);
        handleOnStart();
      } else {
        setIsComplete(true);
      }
    }
  }, [currentDuration, currentScreen]);

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
                      {new Date(currentDuration * 1000)
                        .toISOString()
                        .substr(11, 8)}
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
