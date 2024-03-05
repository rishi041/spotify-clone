import { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { getPlaylistDataRapid } from "../services/PlaylistsServices";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export default function Playlists() {
  const [{ userInfoRapid }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    getPlaylistDataRapid(dispatch);
  }, [dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    navigate("/playlists");
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    dispatch({ type: reducerCases.SET_SEARCH_RAPID, searchPlaylistRapid: [] });
  };

  return (
    <Container>
      <div className="sideBarTextContainer">
        <div className="sideBarText">
          <div className="sideBarIcon">
            <GoHomeFill />
          </div>
          <div>
            <strong
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </strong>
          </div>
        </div>
        <div className="sideBarText">
          <div className="sideBarIcon">
            <IoSearch />
          </div>
          <div>
            <strong
              onClick={() => {
                navigate("/search");
              }}
            >
              Search
            </strong>
          </div>
        </div>
        <div className="sideBarText">
          <div className="sideBarIcon">
            <BiLibrary />
          </div>
          <div>
            <strong
              onClick={() => {
                navigate("/playlists");
              }}
            >
              Your Playlist
            </strong>
          </div>
        </div>
      </div>

      <ul>
        {userInfoRapid?.public_playlists &&
          userInfoRapid?.public_playlists.map(({ name, uri }, index) => {
            const playlistString = uri;
            const playlistID = playlistString.match(
              /spotify:playlist:(\w+)/
            )[1];

            return (
              <li key={index} onClick={() => changeCurrentPlaylist(playlistID)}>
                {name}
              </li>
            );
          })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  .sideBarTextContainer {
    .sideBarText {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1rem;
      padding: 0.4rem 0.4rem 0 0.5rem;
      .sideBarIcon {
        font-size: 1.5rem;
        padding: 0 0.3rem 0 0;
      }
    }
    .sideBarText {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
      @media (max-width: 768px) {
        flex-direction: column;
        font-size: 0.8rem;
      }
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 1.2rem;
      width: 100vw;
      justify-content: space-around;
      z-index: 1;
      background: #181818;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;
