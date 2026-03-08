import { useEffect } from "react";
import styled from "styled-components";
import { SET_PLAYLIST_ID, SET_SEARCH_RAPID } from "../store/spotifySlice";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistDataRapid } from "../services/PlaylistsServices";
import { useNavigate, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export default function Playlists() {
  const userInfoRapid = useSelector((state) => state.spotifyData.userInfoRapid);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    getPlaylistDataRapid(dispatch);
  }, [dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    navigate("/playlists");
    dispatch(SET_PLAYLIST_ID(selectedPlaylistId));
    dispatch(SET_SEARCH_RAPID([]));
  };

  return (
    <Container>
      <div className="sideBarTextContainer">
        <div
          className={`sideBarText ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <div className="sideBarIcon">
            <GoHomeFill />
          </div>
          <span>Home</span>
        </div>
        <div
          className={`sideBarText ${location.pathname === "/search" ? "active" : ""}`}
          onClick={() => navigate("/search")}
        >
          <div className="sideBarIcon">
            <IoSearch />
          </div>
          <span>Search</span>
        </div>
        <div
          className={`sideBarText ${location.pathname === "/playlists" ? "active" : ""}`}
          onClick={() => navigate("/playlists")}
        >
          <div className="sideBarIcon">
            <BiLibrary />
          </div>
          <span>Your Playlist</span>
        </div>
      </div>

      <ul>
        {userInfoRapid?.public_playlists &&
          userInfoRapid?.public_playlists.map(({ name, uri }, index) => {
            const playlistID = uri.match(/spotify:playlist:(\w+)/)?.[1];
            if (!playlistID) return null;

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
  display: flex;
  flex-direction: column;
  .sideBarTextContainer {
    padding: 0.5rem 0;
    border-bottom: 1px solid #282828;
    .sideBarText {
      display: flex;
      justify-content: flex-start;
      font-weight: 700;
      font-size: 0.875rem;
      padding: 0.5rem 0.8rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      border-radius: 4px;
      margin: 0 0.4rem;
      gap: 0.5rem;
      .sideBarIcon {
        font-size: 1.3rem;
        display: flex;
        align-items: center;
      }
      &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.05);
      }
      &.active {
        color: white;
      }
      @media (max-width: 800px) {
        flex-direction: column;
        font-size: 0.7rem;
        padding: 0.4rem;
        margin: 0;
        gap: 0.2rem;
      }
    }
    @media (max-width: 800px) {
      display: flex;
      flex-direction: row;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      justify-content: space-evenly;
      z-index: 10;
      background: #181818;
      border-top: 1px solid #282828;
      border-bottom: none;
      padding: 0.4rem 0;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.5rem;
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 4px;
      }
    }
    li {
      transition: 0.2s ease-in-out;
      cursor: pointer;
      padding: 0.5rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    @media (max-width: 800px) {
      display: none;
    }
  }
`;
