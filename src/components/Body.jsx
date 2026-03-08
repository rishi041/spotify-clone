import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AiFillClockCircle } from "react-icons/ai";
import { SET_PLAYING } from "../store/spotifySlice";
import { getInitialPlaylistRapid } from "../services/BodyServices";
import { msToMinutesAndSeconds } from "../utils/helpers";
import { trackListStyles } from "./styles/TrackListStyles";
import { TrackListSkeleton, ErrorMessage } from "./LoadingSkeleton";

export default function Body({ headerBackground }) {
  const selectedPlaylistRapid = useSelector(
    (state) => state.spotifyData.selectedPlaylistRapid,
  );
  const selectedPlaylistId = useSelector(
    (state) => state.spotifyData.selectedPlaylistId,
  );
  const isLoading = useSelector((state) => state.spotifyData.isLoading);
  const error = useSelector((state) => state.spotifyData.error);
  const dispatch = useDispatch();

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
    return <TrackListSkeleton count={15} />;
  }

  return (
    <Container $headerBackground={headerBackground}>
      {selectedPlaylistRapid && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylistRapid.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylistRapid.name}</h1>
              <p className="description">{selectedPlaylistRapid.description}</p>
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
                      }}
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
      margin: 0 1rem;
    }
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 4px;
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
        @media (max-width: 800px) {
          font-size: 1.8rem;
        }
        @media (max-width: 443px) {
          font-size: 1.5rem;
        }
      }
    }
  }
  ${trackListStyles}
`;
