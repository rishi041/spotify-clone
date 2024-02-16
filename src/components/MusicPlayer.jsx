import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PlayIcon from "../assets/play.png";
import PauseIcon from "../assets/pause.png";
// import "./musicPlayer.css";
import { useStateProvider } from "../utils/StateProvider";

export default function MusicPlayer() {
  const [{ token, selectedPlaylist, currentPlaying }] = useStateProvider();
  const [isPlaying, setIsPlaying] = useState(false);
  const songRef = useRef();
  const progressRef = useRef();
  const ctrlRef = useRef();
  const [currentTimeDuration, setCurrentTimeDuration] = useState({
    start: 0,
    end: 30,
  });

  const [data, setData] = useState(selectedPlaylist);

  useEffect(() => {
    if (currentPlaying) {
      setData(currentPlaying);
    } else {
      setData(selectedPlaylist);
    }
  }, [currentPlaying, selectedPlaylist]);

  useEffect(() => {
    songRef.current.play();
    setIsPlaying(true);
  }, [data]);

  const playPauseFunc = () => {
    if (isPlaying) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = songRef.current.currentTime;
      const duration = songRef.current.duration;

      setCurrentTimeDuration({
        start: currentTime,
        end: duration,
      });

      // Update progress bar
      progressRef.current.value = currentTime;
      progressRef.current.max = duration;

      // Check if progress bar has reached the end
      if (currentTime === duration) {
        setIsPlaying(false);
      }
    };

    songRef.current.addEventListener("timeupdate", updateProgress);

    return () => {
      songRef.current.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    const updateControlButton = () => {
      ctrlRef.current = isPlaying ? (
        <img className="pausePlayIcons" src={PauseIcon} alt="pauseicon" />
      ) : (
        <img className="pausePlayIcons" src={PlayIcon} alt="playicon" />
      );
    };

    updateControlButton();
  }, [isPlaying]);

  const handleProgressBarChange = (e) => {
    const newValue = e.target.value;
    songRef.current.currentTime = newValue;
    progressRef.current.value = newValue;
  };
  if (!token) return null;
  return (
    <Container>
      <audio ref={songRef} src={data?.preview_url} />
      <div className="musicContainer">
        <div className="musicInfo">
          <div className="musicTitle">
            <img src={data?.trackImage} />
             {currentPlaying ? (
              <div className="musicName">{data?.name} </div>
            ) : (
              <div className="musicName">{data?.tracks[0].name} </div>
            )}
          </div>
          <div className="musicControls">
            <div className="progressBar">
              <div className="progressNo">
                00:{Math.round(currentTimeDuration?.start)}
              </div>
              <div>
                <input
                  type="range"
                  id="music-bar"
                  ref={progressRef}
                  value={
                    progressRef?.current?.value === undefined
                      ? "0"
                      : progressRef?.current?.value
                  }
                  onChange={handleProgressBarChange}
                />
              </div>
              <div className="progressNo">
                00:{Math.round(currentTimeDuration?.end)}
              </div>
            </div>

            <div ref={ctrlRef} onClick={playPauseFunc}>
              {isPlaying ? (
                currentTimeDuration?.start === 0 ? (
                  <img
                    className="pausePlayIcons"
                    src={PlayIcon}
                    alt="playicon"
                  />
                ) : (
                  <img
                    className="pausePlayIcons"
                    src={PauseIcon}
                    alt="pauseicon"
                  />
                )
              ) : (
                <img className="pausePlayIcons" src={PlayIcon} alt="playicon" />
              )}
            </div>
          </div>
          <div className="soundControls"></div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .musicContainer {
    color: #fff;
    .musicInfo {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .musicTitle {
        display: flex;
        align-items: flex-end;
      }

      .musicControls {
        display: flex;
        flex-direction: column;
        align-items: center;
        .progressBar {
          display: flex;
          align-items: baseline;
          .progressNo {
            padding: 0 10px;
          }
        }
        .pausePlayIcons {
          margin-top: 0.9rem;
          width: 40px;
        }
      }

      .soundControls {
        width: 100px;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: white;
      }

      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: #2c2929;
      }

      input:hover {
        cursor: pointer;
      }

      #music-bar {
        width: 340px;
        margin-top: 1.5rem;
        height: 2.5px;
        border-radius: 0;
        transition: all 0.3s ease;
      }
    }
  }
`;
