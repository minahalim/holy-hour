import React, { useState, useRef, useEffect } from "react";
import NoSleep from 'nosleep.js';

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
    description:
      "This is a time of verbal prayer before the Lord, giving him praise and asking his mercy.",
  },
  {
    title: "Spiritual Reading",
    duration: 900,
    description:
      "This will likely consist of your daily Exodus 90 reflection (Daily Bearings, Scripture, and Reflection)",
  },
  {
    title: "Silent Prayer",
    duration: 1200,
    description:
      "This is set aside time to dialogue with the Lord. Bring before him whatever is on your mind and heart. This will often be fueled by questions from the day’s reflection. Honestly share with the Lord your thoughts and concerns. Then, and most importantly, give the Lord the space to respond and yourself the silence to listen.",
  },
  {
    title: "Intercession",
    duration: 900,
    description:
      "Pray for your own deliverance, for your family, your fraternity, the Church, and any other prayers you may have.",
  },
  {
    title: "Thanksgiving",
    duration: 300,
    description:
      "We have much to be thankful for each day. Consistent acknowledgment of God’s gifts and graces brings a greater sense of appreciation and joy into life. Make a prayer of praise and thanksgiving before the Lord.",
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
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleOnStart = () => {
    clearInterval(interval.current);

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
        <div
          className="menu-icon-wrapper"
          onClick={() => setIsMenuActive(true)}
        >
          <div className="menu-icon" />
          <div className="menu-icon" />
          <div className="menu-icon" />
        </div>
        <ul className={`menu ${isMenuActive && "menu-active"}`}>
          {screens.map((screen, index) => (
            <li
              key={screen.title}
              className={`menu-item ${
                (index === currentScreen && "active") || null
              }`}
              onClick={() => {
                setCurrentScreen(index);
                setCurrentDuration(screen.duration);
                handleOnStart();
                setIsMenuActive(false);
              }}
            >
              {screen.title}
            </li>
          ))}
        </ul>
        {
          <>
            {isComplete ? (
              <>
                Holy Hour Completed!
                <br />
                <br />
                <div className="description">
                  Close by asking Our Lady and your chosen saints to intercede
                  for you throughout the day, just as you would ask your
                  brothers to pray for you.
                </div>
              </>
            ) : (
              <div className="timer-wrapper" onClick={handleonPlayPause}>
                {isStarted && (
                  <>
                    <div className={isPlaying ? "heart" : ""}>
                      {screens[currentScreen].title}
                    </div>
                    <br />
                    {!isPlaying && <span className="play heart" />}
                    <div className="timer">
                      {new Date(currentDuration * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </div>
                    {!isPlaying && <span className="play heart" />}
                    <br />
                    <br />
                    <div className="description">
                      {screens[currentScreen].description}
                    </div>
                  </>
                )}
              </div>
            )}
            {!isStarted && (
              <div
                className="start-button"
                onClick={() => {
                  const noSleep = new NoSleep();

                  noSleep.enable();
                  handleOnStart();
                }}
              >
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
