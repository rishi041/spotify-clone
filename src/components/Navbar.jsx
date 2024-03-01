import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect, useCallback } from "react";
import { getSearchRapidData } from "../services/SearchServices";
import { useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
export default function Navbar({ navBackground }) {
  const [{ userInfoRapid }, dispatch] = useStateProvider();
  const [search, setSearch] = useState("");
  const location = useLocation();


  const useDebounce = (effect, dependencies, delay) => {
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
      const timeout = setTimeout(callback, delay);

      return () => clearTimeout(timeout);
    }, [callback, delay]);
  };

  useDebounce(
    () => {
      // getSearchData(token, dispatch, search);
      getSearchRapidData(dispatch, search)

    },
    [search, dispatch],
    800,
  );

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <Container navBackground={navBackground}>
      <div className="searchMusicContainer">
        {location.pathname == "/search" ?
          <div className="search__bar">
            <FaSearch />
            <input
              id="search"
              type="text"
              spellCheck="false"
              value={search || ""}
              onChange={handleSearch}
              placeholder="Artists, songs, or podcasts"
            />
          </div>
          :
          <>
            {
              location.pathname == "/" ?
                (<h1 style={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  width: '8.5rem',
                  justifyContent: 'space-between'
                }}><GoHomeFill />{' '} Home</h1>
                ) : (<h1 style={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  width: '14.2rem',
                  justifyContent: 'space-between'
                }}><BiLibrary />{' '} Your Playlist</h1>)
            }
          </>

        }

      </div>
      <div className="avatar">
        <a href={userInfoRapid?.userUrl}>
          <CgProfile />
          <span>{userInfoRapid?.name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  z-index: 2;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .searchMusicContainer {
    position: relative;
    width: 50vw;
    .search__bar {
      background-color: white;
      padding: 0.4rem 1rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      input {
        border: none;
        height: 2rem;
        width: 100%;
        &:focus {
          outline: none;
        }
      }
    }
    .searchMusicInfo {
      position: absolute;
      top: 2.8rem;
      border-radius: 0 0 1rem 1rem;
      height: 20rem;
      overflow-y: scroll;
      background-color: white;
      .musicList {
        display: flex;
        padding: 0.4rem 1rem;
        width: 50vw;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
