import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { truncateString } from "../utils/helpers";

export default function MusicPlayer() {
  const selectedPlaylistRapid = useSelector(
    (state) => state.spotifyData.selectedPlaylistRapid,
  );
  const currentPlaying = useSelector(
    (state) => state.spotifyData.currentPlaying,
  );
  const [data, setData] = useState(selectedPlaylistRapid);

  useEffect(() => {
    if (currentPlaying) {
      setData(currentPlaying);
    } else {
      setData(selectedPlaylistRapid);
    }
  }, [currentPlaying, selectedPlaylistRapid]);

  const trackInfo = currentPlaying
    ? {
        name: currentPlaying.name,
        artists: currentPlaying.artists,
        image: currentPlaying.trackImage,
        src: currentPlaying.preview_url,
      }
    : data?.tracks?.[0]
      ? {
          name: data.tracks[0].name,
          artists: data.tracks[0].artists,
          image: data.trackImage,
          src: data.preview_url,
        }
      : { name: "", artists: [], image: "", src: "" };

  const artistString = Array.isArray(trackInfo.artists)
    ? trackInfo.artists.join(", ")
    : String(trackInfo.artists || "");

  return (
    <Container>
      <div className="musicTitle">
        {trackInfo.image && <img src={trackInfo.image} alt="" />}
        <div className="musicTitleDetails">
          <div className="musicName">{truncateString(trackInfo.name, 20)}</div>
          {artistString && (
            <div className="musicNameArtists">
              by {truncateString(artistString, 30)}
            </div>
          )}
        </div>
      </div>

      <div className="musicControls">
        <AudioPlayer
          src={trackInfo.src}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          layout="stacked-reverse horizontal"
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  gap: 12px;

  .musicTitle {
    display: flex;
    align-items: center;
    min-width: 220px;
    max-width: 280px;
    gap: 12px;
    flex-shrink: 0;
    img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .musicTitleDetails {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
      overflow: hidden;
      .musicName {
        font-weight: 600;
        font-size: 0.85rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .musicNameArtists {
        font-size: 0.7rem;
        color: #b3b3b3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .musicControls {
    flex: 1;
    min-width: 0;
  }

  .rhap_container {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }

  .rhap_main {
    background-color: transparent;
  }

  .rhap_button,
  .rhap_volume-indicator,
  .rhap_progress-indicator {
    background-color: var(--rhap-theme-color);
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

  /* Tablet */
  @media (max-width: 800px) {
    .musicTitle {
      min-width: 140px;
      max-width: 180px;
      .musicNameArtists {
        display: none;
      }
    }
  }

  /* Mobile */
  @media (max-width: 443px) {
    gap: 6px;
    .musicTitle {
      min-width: 100px;
      max-width: 120px;
      gap: 8px;
      img {
        width: 40px;
        height: 40px;
      }
      .musicName {
        font-size: 0.75rem;
      }
    }
    .rhap_time {
      font-size: 0.65rem;
    }
    .rhap_volume-controls {
      display: none;
    }
  }
`;
