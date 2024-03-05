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

  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    if (selectedPlaylistRapid) {
      setIsHovered(selectedPlaylistRapid.tracks.map(() => false));
    }
  }, [selectedPlaylistRapid]);

  useEffect(() => {
    getInitialPlaylistRapid(dispatch, '37i9dQZF1DWXtlo6ENS92N');
  }, [dispatch, selectedPlaylistId]);


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
                  // track_number,
                  duration,
                },
                index
              ) => {

                return (
                  <div
                    className="songCard"
                    key={id}
                    onMouseEnter={() => {
                      setIsHovered(prev => prev.map((_, i) => (i === index ? true : _)));
                    }}
                    onMouseLeave={() => {
                      setIsHovered(prev => prev.map((_, i) => (i === index ? false : _)));
                    }}

                  >
                    <div className="songCardImage">
                      <img src={trackImageHome} alt="track" />
                      {isHovered[index] && (
                        <div
                          className="songCardPlayIcon"
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
                          }>
                          <IoPlayCircle />
                        </div>
                      )}
                    </div>

                    <div className="songCardName">{truncateString(name, 25)}</div>
                    <div className="songCardArtistName">
                      {truncateString(`${[...artists].join(', ')}`, 25)}
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
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      grid-gap: 1rem;
      .songCard {
        color: #fff;
        border-radius: 0.8rem;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: space-around;
        padding: 1rem 0;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
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
            color: #1db954;
            bottom: -0.7rem;
            right: -0.2rem;
            transform: translate(-0.1rem, -0.1rem);
            font-size: 4rem;
            cursor: pointer;
            opacity: 1;
            animation: fadeIn 0.3s ease-in; 
            @keyframes fadeIn {  
              from {  
                  opacity:0;  
              }  
              to {  
                  opacity:1;  
              }  
           }
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
