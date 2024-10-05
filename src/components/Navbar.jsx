import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { getSearchRapidData } from "../services/SearchServices";
import { useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
export default function Navbar({ navBackground }) {
  const userInfoRapid = useSelector((state) => state.spotifyData.userInfoRapid)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (search !== "") {
      getSearchRapidData(dispatch, search);
    }
  }, [search, dispatch]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <Container $navBackground={navBackground}>
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
                (<h1 className="navBarHeader" style={{ width: '8.5rem' }}><GoHomeFill />{' '} Home</h1>
                ) : (<h1 className="navBarHeader"><BiLibrary />{' '} Your Playlist</h1>)
            }
            <div className="logo">
              <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="spotify"
              />
            </div>
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
  background-color: ${(props) =>
    props.$navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .searchMusicContainer {
    position: relative;
    width: 50vw;
    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      color: white;
      text-align: start;
      margin: 1rem 0;
      padding: 0 0.4rem;
      display: none;
      img {
        max-inline-size: calc(100% - 20vw);
        block-size: auto;
      }
      @media (max-width: 800px) {
        display: initial;
      }
    }
    .navBarHeader{
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 14.2rem;
      @media (max-width: 443px) {
        width: 13rem;
      }
      @media (max-width: 800px) {
        display: none;        
      }
    }
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
        
        /* For WebKit browsers */
        &:-webkit-autofill {
          background-color: white !important;
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          color: black !important;
        }
      
        /* For Firefox */
        &::autofill {
          background-color: white !important;
          color: black !important;
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
  @media (max-width: 443px) {
    padding: 2rem 1rem;
  }
`;
