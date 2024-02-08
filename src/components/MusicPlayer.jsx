import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// import "./musicPlayer.css";
import { useStateProvider } from "../utils/StateProvider";

export default function MusicPlayer() {
  const [{ token, selectedPlaylist, currentPlaying }] = useStateProvider();
  const [isPlaying, setIsPlaying] = useState(false);
  const songRef = useRef();
  const progressRef = useRef();
  const ctrlRef = useRef();

  const [data, setData] = useState(selectedPlaylist);
  console.log(data, "data");
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
      ctrlRef.current.textContent = isPlaying ? "pause" : "play";
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
      <div className="musicContainer">
        <div>music Name: {data?.name} </div>
        <div>
          <audio ref={songRef} src={data?.preview_url} />

          <img src={data?.trackImage} />
          <input
            type="range"
            ref={progressRef}
            value={
              progressRef?.current?.value === undefined
                ? "0"
                : progressRef?.current?.value
            }
            onChange={handleProgressBarChange}
          />

          <div ref={ctrlRef} onClick={playPauseFunc}>
            {!isPlaying ? "play" : "pause"}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .musicContainer {
    color: #fff;
    display: flex;
  }
`;
