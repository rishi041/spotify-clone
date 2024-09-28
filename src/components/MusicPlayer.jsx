import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function MusicPlayer() {
  const selectedPlaylistRapid = useSelector((state) => state.spotifyData.selectedPlaylistRapid)
  const currentPlaying = useSelector((state) => state.spotifyData.currentPlaying)
  const [data, setData] = useState(selectedPlaylistRapid);

  useEffect(() => {
    if (currentPlaying) {
      setData(currentPlaying);
    } else {
      setData(selectedPlaylistRapid);
    }
  }, [currentPlaying, selectedPlaylistRapid]);

  return (
    <Container>
      <PlayerApp data={data} />
    </Container>
  );
}

const PlayerApp = ({ data }) => {
  const currentPlaying = useSelector((state) => state.spotifyData.currentPlaying)
  const playlist = [
    {
      src: data?.preview_url,
      name: data?.name,
      image: data?.trackImage,
      artists: data?.artists,
    },
  ];
  const [currentTrack, setTrackIndex] = useState(0);

  function truncateString(inputString, maxLength) {
    if (inputString) {
      if (inputString?.length <= maxLength) {
        return `${inputString}`;
      } else {
        return `${inputString?.substring(0, maxLength)}...`;
      }
    }
  }

  return (
    <Container>
      <div className="musicContainer">
        <div className="musicInfo">
          <div className="musicTitle">
            <img src={playlist[currentTrack].image} />
            {currentPlaying ? (
              <div>
                <div className="musicName">
                  <strong>
                    {truncateString(playlist[currentTrack].name, 15)}
                  </strong>
                </div>
                {playlist[currentTrack].artists && (
                  <div className="musicNameArtists">
                    by {truncateString(playlist[currentTrack].artists, 10)}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="musicName">
                  <strong>{data?.tracks[0].name}</strong>
                </div>
                {data?.tracks[0].artists && (
                  <div className="musicNameArtists">
                    by {data?.tracks[0].artists}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="musicControls">
            <AudioPlayer
              src={playlist[currentTrack].src}
              customControlsSection={[
                RHAP_UI.ADDITIONAL_CONTROLS,
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.VOLUME_CONTROLS,
              ]}
              layout="stacked-reverse horizontal"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .musicContainer {
    color: #fff;
    margin-bottom: 2rem;
    .musicInfo {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .musicTitle {
        display: flex;
        align-items: center;
        .musicName {
          margin-left: 1rem;
          font-size: 1rem;
        }
        .musicNameArtists {
          margin-left: 1rem;
          font-size: 1rem;
          @media (max-width: 768px) {
            display: none;
          }
        }
        width: 20%;
      }

      .musicControls {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
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
        @media (max-width: 768px) {
          width: 60%;
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

  .rhap_button,
  .rhap_volume-indicator,
  .rhap_progress-indicator {
    background-color: var(--rhap-theme-color);
  }

  .rhap_main,
  .rhap_container {
    background-color: var(--rhap-background-color);
  }

  .rhap_progress-filled {
    background-color: var(--rhap-bar-color);
  }

  .rhap_main-controls-button,
  .rhap_time,
  .rhap_button-clear,
  .rhap_controls-section {
    color: var(--rhap-bar-color);
    font-family: var(--rhap-font-family);
  }
  @media (max-width: 768px) {
    position: absolute;
    bottom: 1rem;
    background: #181818;
    width: 97vw;
  }
`;
