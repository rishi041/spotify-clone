import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { SET_PLAYING } from "../store/spotifySlice";
import { useDispatch, useSelector } from "react-redux";
import { msToMinutesAndSeconds } from "../utils/helpers";
import { trackListStyles } from "./styles/TrackListStyles";
import { TrackListSkeleton } from "./LoadingSkeleton";

export default function SearchPage({ navBackground: headerBackground }) {
  const searchPlaylistRapid = useSelector(
    (state) => state.spotifyData.searchPlaylistRapid,
  );
  const isSearching = useSelector((state) => state.spotifyData.isSearching);
  const dispatch = useDispatch();

  if (isSearching) {
    return <TrackListSkeleton count={15} />;
  }

  return (
    <Container $headerBackground={headerBackground}>
      {searchPlaylistRapid.tracks?.length > 0 ? (
        <>
          <div className="playlist">
            <div className="image"></div>
            <div className="details">
              <span className="type">Search Songs</span>
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
              {searchPlaylistRapid.tracks.map(({ data }, index) => {
                const id = data.id;
                const name = data.name;
                const artists = data.artists;
                const album = data.albumOfTrack;
                const uri = data.uri;
                const duration_ms = data.duration.totalMilliseconds;
                const trackImage =
                  album.coverArt.sources[1]?.url ||
                  album.coverArt.sources[0]?.url;
                const artistName = artists.items[0]?.profile.name || "Unknown";

                return (
                  <div
                    className="row"
                    key={id}
                    onClick={() => {
                      const currentPlaying = {
                        id,
                        name,
                        artists: [artistName],
                        trackImage,
                        preview_url: null,
                        context_uri: uri,
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
                        <span className="artistsName">{artistName}</span>
                      </div>
                    </div>
                    <div className="col albumName">
                      <span>{album.name}</span>
                    </div>
                    <div className="col">
                      <span>{msToMinutesAndSeconds(duration_ms)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <EmptyState>Song stuck in your head? Just type to search...</EmptyState>
      )}
    </Container>
  );
}

const EmptyState = styled.div`
  color: white;
  display: flex;
  height: 60vh;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 443px) {
    font-size: 1.1rem;
  }
`;

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
    .details {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      color: #e0dede;
      .type {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
  }
  ${trackListStyles}
`;
