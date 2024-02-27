import { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { getPlaylistDataRapid } from "../services/PlaylistsServices";

export default function Playlists() {
  const [{ userInfoRapid }, dispatch] = useStateProvider();

  useEffect(() => {
    getPlaylistDataRapid(dispatch);
  }, [dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    dispatch({ type: reducerCases.SET_SEARCH_RAPID, searchPlaylistRapid: [] });
  };

  return (
    <Container>
      <strong className="my-lib">Your Playlist</strong>
      <ul>
        {userInfoRapid?.public_playlists &&
          userInfoRapid?.public_playlists.map(({ name, uri }, index) => {
            const playlistString = uri;
            const playlistID = playlistString.match(
              /spotify:playlist:(\w+)/,
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
  .my-lib {
    padding: 0.5rem;
    font-size: 1rem;
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
