import styled from "styled-components";
import {
  getInitialPlaylistRapid,
  playTrackRapid,
} from "../services/BodyServices";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useState } from "react";
import { IoPlayCircle } from "react-icons/io5";

export default function Home() {
  const [
    { selectedPlaylistRapid, selectedPlaylistId, searchPlaylistRapid },
    dispatch,
  ] = useStateProvider();

//   const [isHovered, setIsHovered] = useState(
//     selectedPlaylistRapid && selectedPlaylistRapid.tracks.map(() => false)
//   );

  function truncateString(inputString, maxLength) {
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.substring(0, maxLength) + "...";
    }
  }

  useEffect(() => {
    getInitialPlaylistRapid(dispatch, selectedPlaylistId);
  }, [dispatch, selectedPlaylistId]);

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
                  // track_number,
                  duration,
                },
                index
              ) => {
                return (
                  <div
                    className="songCard"
                    key={id}
                    // onMouseEnter={() => {
                    //   setIsHovered((prev) =>
                    //     prev.map((_, i) => (i === index ? true : _))
                    //   );
                    // }}
                    // onMouseLeave={() => {
                    //   setIsHovered((prev) =>
                    //     prev.map((_, i) => (i === index ? false : _))
                    //   );
                    // }}
                    onClick={() =>
                      playTrackRapid(
                        dispatch,
                        id,
                        name,
                        artists,
                        trackImage,
                        preview_url,
                        context_uri
                        // track_number,
                        // token,
                      )
                    }
                  >
                    <div className="songCardImage">
                      <img src={trackImageHome} alt="track" />
                      {/* {isHovered[index] && (
                        <div className="songCardPlayIcon">
                          <IoPlayCircle />
                        </div>
                      )} */}
                    </div>

                    <div className="songCardName">{name}</div>
                    <div className="songCardArtistName">
                      {/* {truncateString(artists, 25)} */}
                      {artists}
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
    .songContainer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
      grid-gap: 3rem;
      .songCard {
        color: #fff;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        .songCardImage {
          position: relative;
          img {
            width: 12rem;
            height: 12rem;
            object-fit: contain;
            border-radius: 0.8rem;
            z-index: -1;
          }
          .songCardPlayIcon {
            position: absolute;
            color: green;
            bottom: -0.7rem;
            right: -0.2rem;
            transform: translate(-0.1rem, -0.1rem);
            font-size: 4rem;
            cursor: pointer;
          }
        }
        .songCardName {
          margin: 10px 0;
        }
        .songCardArtistName {
          margin: 0;
        }
      }
    }
  }
`;
