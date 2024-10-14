import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AiFillClockCircle } from "react-icons/ai";
import { SET_PLAYING } from "../store/spotifySlice";
import {
  getInitialPlaylistRapid,
} from "../services/BodyServices";

// eslint-disable-next-line react/prop-types
export default function Body({ headerBackground }) {
  const selectedPlaylistRapid = useSelector((state) => state.spotifyData.selectedPlaylistRapid)
  const selectedPlaylistId = useSelector((state) => state.spotifyData.selectedPlaylistId)
  const dispatch = useDispatch()

  useEffect(() => {
    getInitialPlaylistRapid(dispatch, selectedPlaylistId);
  }, [selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylistRapid && (
        <>
          <div className="playlist">
            <div className="image">

              <img
                src={selectedPlaylistRapid.image}
                alt="selected playlist"
              />

            </div>
            <div className="details">

              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylistRapid.name}</h1>
              <p className="description">
                {selectedPlaylistRapid.description}
              </p>

            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col albumName">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>


            <div className="tracks">
              {selectedPlaylistRapid.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    trackImage,
                    preview_url,
                    context_uri,
                    album,
                    duration,
                  },
                  index,
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
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
                      }
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={trackImage} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span className="artistsName">{artists}</span>
                        </div>
                      </div>
                      <div className="col albumName">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    @media (max-width: 800px) {
      gap: 0.5rem;
    }
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        @media (max-width: 800px) {
          width: 7rem;
          height: 7rem;
        }
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 3rem;
        @media (max-width: 443px) {
          font-size: 2rem; 
        }
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
    headerBackground ? "#000000dc" : "none"};
      @media (max-width: 443px) {
        grid-template-columns: 0.3fr 3fr 0.1fr 0.1fr;
        .albumName {
          display: none;
        }
      }
    }
    .tracks {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          cursor: pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          font-size: 0.875rem;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
            .name {
              font-weight: 600;
            }
            .artistsName{
              font-size: 0.7rem;
            }
          }
        }
        @media (max-width: 443px) {
          grid-template-columns: 0.3fr 3fr 0.1fr 0.1fr;
          .albumName{
            display: none;
          }
        }
      }
    }
  }
`;
