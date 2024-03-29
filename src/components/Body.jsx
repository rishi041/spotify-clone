// import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
// import { reducerCases } from "../../utils/Constants";
import { getInitialPlaylist, playTrack } from "../services/BodyServices";

// eslint-disable-next-line react/prop-types
export default function Body({ headerBackground }) {
  const [
    { token, selectedPlaylist, selectedPlaylistId, searchPlaylist },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    getInitialPlaylist(token, dispatch, selectedPlaylistId);
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              {searchPlaylist.tracks ? (
                <></>
              ) : (
                <img src={selectedPlaylist.image} alt="selected playlist" />
              )}
            </div>
            <div className="details">
              {searchPlaylist.tracks ? (
                <span className="type">Search Songs</span>
              ) : (
                <>
                  <span className="type">PLAYLIST</span>
                  <h1 className="title">{selectedPlaylist.name}</h1>
                  <p className="description">{selectedPlaylist.description}</p>
                </>
              )}
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
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            {searchPlaylist.tracks ? (
              <div className="tracks">
                {searchPlaylist.tracks.items.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      trackImage,
                      preview_url,
                      context_uri,
                      album,
                      uri,
                      // track_number,
                      duration_ms,
                    },
                    index,
                  ) => {
                    return (
                      <div
                        className="row"
                        key={id}
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            (artists = [`${artists[0].name}`, ""]),
                            (trackImage = album.images[2].url),
                            (preview_url = preview_url),
                            (context_uri = uri),
                            // track_number,
                            // token,
                            dispatch,
                          )
                        }
                      >
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                          <div className="image">
                            <img src={album.images[2].url} alt="track" />
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists[0].name}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{album.name}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinutesAndSeconds(duration_ms)}</span>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className="tracks">
                {selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      trackImage,
                      preview_url,
                      context_uri,
                      album,
                      // track_number,
                      duration,
                    },
                    index,
                  ) => {
                    return (
                      <div
                        className="row"
                        key={id}
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            trackImage,
                            preview_url,
                            context_uri,
                            // track_number,
                            // token,
                            dispatch,
                          )
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
                            <span>{artists}</span>
                          </div>
                        </div>
                        <div className="col">
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
            )}
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
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
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
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          cursor: pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
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
          }
        }
      }
    }
  }
`;
