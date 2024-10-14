import styled from "styled-components";
import {
  getInitialPlaylistRapid,
} from "../services/BodyServices";
import { SET_PLAYING } from "../store/spotifySlice";
import { useEffect, useState } from "react";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const selectedPlaylistRapid = useSelector((state) => state.spotifyData.selectedPlaylistRapid)
  const selectedPlaylistId = useSelector((state) => state.spotifyData.selectedPlaylistId)
  const dispatch = useDispatch()

  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    if (selectedPlaylistRapid) {
      setIsHovered(selectedPlaylistRapid.tracks.map(() => false));
    }
  }, [selectedPlaylistRapid]);

  useEffect(() => {
    getInitialPlaylistRapid(dispatch, "37i9dQZF1DWXtlo6ENS92N");
  }, [selectedPlaylistId]);

  function truncateString(inputString, maxLength) {
    if (inputString.length <= maxLength) {
      return `${inputString}`;
    } else {
      return `${inputString.substring(0, maxLength)}...`;
    }
  }

  return (
    <Container>
      <div className="homeContainer">
        <div className="songContainer">
          {selectedPlaylistRapid &&
            selectedPlaylistRapid.tracks.map(
              (
                {
                  id,
                  name,
                  artists,
                  trackImageHome,
                  trackImage,
                  preview_url,
                  context_uri,
                  album,
                  duration,
                },
                index
              ) => {
                return (
                  <div
                    className="songCard"
                    key={id}
                    onMouseEnter={() => {
                      setIsHovered((prev) =>
                        prev.map((_, i) => (i === index ? true : _))
                      );
                    }}
                    onMouseLeave={() => {
                      setIsHovered((prev) =>
                        prev.map((_, i) => (i === index ? false : _))
                      );
                    }}
                  >
                    <div className="songCardImage">
                      <img src={trackImageHome} alt="track" />
                      {isHovered[index] && (
                        <div
                          className="songCardPlayIcon"
                          onClick={() => {

                            const currentPlaying = {
                              id,
                              name,
                              artists,
                              trackImage,
                              preview_url,
                              context_uri,
                            };
                            dispatch(SET_PLAYING(currentPlaying));
                          }}
                        >
                          <IoPlayCircle />
                        </div>
                      )}
                    </div>

                    <div className="songCardName">
                      {truncateString(name, 25)}
                    </div>
                    <div className="songCardArtistName">
                      {truncateString(`${[...artists].join(", ")}`, 25)}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .homeContainer {
    padding: 1rem 1rem;
    .songContainer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      grid-gap: 1rem;
      .songCard {
        color: #fff;
        border-radius: 0.8rem;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: space-around;
        padding: 1rem 25px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .songCardImage {
          position: relative;
          img {
            width: 8rem;
            height: 8rem;
            object-fit: contain;
            border-radius: 0.8rem;
            z-index: -1;
            @media (max-width: 800px) {
              width: 6.5rem;
              height: 6.5rem;
            }
          }
          .songCardPlayIcon {
            position: absolute;
            color: #1db954;
            bottom: -0.7rem;
            right: -0.2rem;
            transform: translate(-0.1rem, -0.1rem);
            font-size: 3rem;
            cursor: pointer;
            opacity: 1;
            animation: fadeIn 0.3s ease-in;
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @media (max-width: 800px) {
              font-size: 2.5rem;
            }
          }
        }
        .songCardName {
          margin: 2px 0;
          font-weight: 600;
        }
        .songCardArtistName {
          margin: 0;
          font-size: 0.7rem;
           @media (max-width: 800px) {
           display:none;
           }
        }
        @media (max-width: 800px) {
          align-items: center;
          padding: 1rem 13px;
        }
      }
      @media (max-width: 800px) {
        grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
      }
    }
  }
`;
