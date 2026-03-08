import styled from "styled-components";
import { getInitialPlaylistRapid } from "../services/BodyServices";
import { SET_PLAYING } from "../store/spotifySlice";
import { useEffect, useState } from "react";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { truncateString } from "../utils/helpers";
import { CardSkeleton, ErrorMessage } from "./LoadingSkeleton";

export default function Home() {
  const selectedPlaylistRapid = useSelector(
    (state) => state.spotifyData.selectedPlaylistRapid,
  );
  const selectedPlaylistId = useSelector(
    (state) => state.spotifyData.selectedPlaylistId,
  );
  const isLoading = useSelector((state) => state.spotifyData.isLoading);
  const error = useSelector((state) => state.spotifyData.error);
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    if (selectedPlaylistRapid) {
      setIsHovered(selectedPlaylistRapid.tracks.map(() => false));
    }
  }, [selectedPlaylistRapid]);

  useEffect(() => {
    getInitialPlaylistRapid(dispatch, selectedPlaylistId);
  }, [selectedPlaylistId, dispatch]);

  if (error && !selectedPlaylistRapid) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => getInitialPlaylistRapid(dispatch, selectedPlaylistId)}
      />
    );
  }

  if (isLoading && !selectedPlaylistRapid) {
    return (
      <Container>
        <div className="homeContainer">
          <CardSkeleton count={32} />
        </div>
      </Container>
    );
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
                },
                index,
              ) => {
                return (
                  <div
                    className="songCard"
                    key={id}
                    onMouseEnter={() => {
                      setIsHovered((prev) =>
                        prev.map((val, i) => (i === index ? true : val)),
                      );
                    }}
                    onMouseLeave={() => {
                      setIsHovered((prev) =>
                        prev.map((val, i) => (i === index ? false : val)),
                      );
                    }}
                  >
                    <div className="songCardImage">
                      <img src={trackImageHome} alt={name} />
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
                      {truncateString(name, 22)}
                    </div>
                    <div className="songCardArtistName">
                      {truncateString(`${[...artists].join(", ")}`, 28)}
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .homeContainer {
    padding: 1rem 1.5rem;
    @media (max-width: 800px) {
      padding: 0.75rem;
    }
    .songContainer {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      grid-gap: 1rem;

      /* Laptop / Desktop */
      @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      }

      .songCard {
        color: #fff;
        border-radius: 8px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 14px;
        background-color: rgba(255, 255, 255, 0.05);
        transition: background-color 0.3s ease;
        cursor: pointer;
        &:hover {
          background-color: rgba(255, 255, 255, 0.12);
        }
        .songCardImage {
          position: relative;
          width: 100%;
          img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          }
          .songCardPlayIcon {
            position: absolute;
            color: #1db954;
            bottom: 8px;
            right: 8px;
            font-size: 2.8rem;
            cursor: pointer;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
            animation: fadeIn 0.3s ease-in;
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          }
        }
        .songCardName {
          margin-top: 10px;
          font-weight: 600;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          line-height: 1.3;
        }
        .songCardArtistName {
          margin-top: 4px;
          font-size: 0.72rem;
          color: #b3b3b3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          line-height: 1.3;
        }
      }

      /* Tablet */
      @media (max-width: 800px) {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        grid-gap: 0.75rem;
        .songCard {
          padding: 10px;
          .songCardPlayIcon {
            font-size: 2.2rem;
          }
        }
      }

      /* Mobile */
      @media (max-width: 443px) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 0.5rem;
        .songCard {
          padding: 8px;
          .songCardName {
            font-size: 0.75rem;
          }
          .songCardArtistName {
            font-size: 0.65rem;
          }
          .songCardPlayIcon {
            font-size: 2rem;
          }
        }
      }
    }
  }
`;
