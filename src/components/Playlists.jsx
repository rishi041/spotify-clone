import { useEffect } from "react";
import styled from "styled-components";
import { SET_PLAYLIST_ID, SET_SEARCH_RAPID } from "../utils/SpotifyReducer";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistDataRapid } from "../services/PlaylistsServices";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export default function Playlists() {
  const userInfoRapid = useSelector((state) => state.spotifyData.userInfoRapid)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    getPlaylistDataRapid(dispatch);
  }, []);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    navigate("/playlists");
    dispatch(SET_PLAYLIST_ID(selectedPlaylistId));
    dispatch(SET_SEARCH_RAPID(searchPlaylistRapid = []));
  };

  return (
    <Container>
      <div className="sideBarTextContainer">
        <div className="sideBarText">
          <div className="sideBarIcon">
            <GoHomeFill />
          </div>
          <div onClick={() => {
            navigate("/");
          }}>
            Home
          </div>
        </div>
        <div className="sideBarText">
          <div className="sideBarIcon">
            <IoSearch />
          </div>
          <div onClick={() => {
            navigate("/search");
          }}>
            Search
          </div>
        </div>
        <div className="sideBarText">
          <div className="sideBarIcon">
            <BiLibrary />
          </div>
          <div onClick={() => {
            navigate("/playlists");
          }}>
            Your Playlist
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
      justify-content: flex-start;
      font-weight: 700;
      font-size: 0.875rem;
      padding: 0.2rem 0.4rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      .sideBarIcon {
        font-size: 1.3rem;
        padding: 0 0.3rem 0 0;
      }
      &:hover {
        color: white;
      }
      @media (max-width: 800px) {
        flex-direction: column;
        font-size: 0.8rem;
      }
    }
    @media (max-width: 800px) {
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 1.2rem;
      width: 100%;
      justify-content: space-evenly;
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
