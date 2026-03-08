import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { getSearchRapidData } from "../services/SearchServices";
import { useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";

export default function Navbar({ navBackground }) {
  const userInfoRapid = useSelector((state) => state.spotifyData.userInfoRapid);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (search === "") return;
    const timer = setTimeout(() => {
      getSearchRapidData(dispatch, search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <Container $navBackground={navBackground}>
      <div className="searchMusicContainer">
        {location.pathname === "/search" ? (
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
        ) : (
          <>
            {location.pathname === "/" ? (
              <h1 className="navBarHeader" style={{ width: "8.5rem" }}>
                <GoHomeFill /> Home
              </h1>
            ) : (
              <h1 className="navBarHeader">
                <BiLibrary /> Your Playlist
              </h1>
            )}
            <div className="logo">
              <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                alt="spotify"
              />
            </div>
          </>
        )}
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
  padding: 0 2rem;
  height: 64px;
  position: sticky;
  z-index: 2;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${(props) =>
    props.$navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .searchMusicContainer {
    position: relative;
    flex: 1;
    max-width: 60%;
    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      color: white;
      text-align: start;
      padding: 0;
      display: none;
      img {
        height: 28px;
        width: auto;
      }
      @media (max-width: 800px) {
        display: block;
      }
    }
    .navBarHeader {
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      white-space: nowrap;
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
      max-width: 400px;
      input {
        border: none;
        height: 2rem;
        width: 100%;
        font-size: 0.9rem;
        &:focus {
          outline: none;
        }
        &:-webkit-autofill {
          background-color: white !important;
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          color: black !important;
        }
        &::autofill {
          background-color: white !important;
          color: black !important;
        }
      }
      @media (max-width: 443px) {
        max-width: 100%;
      }
    }
    @media (max-width: 443px) {
      max-width: 70%;
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
    flex-shrink: 0;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-size: 0.85rem;
      white-space: nowrap;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
      span {
        @media (max-width: 443px) {
          display: none;
        }
      }
    }
  }
  @media (max-width: 800px) {
    padding: 0 1rem;
    height: 56px;
  }
  @media (max-width: 443px) {
    padding: 0 0.75rem;
    height: 48px;
  }
`;
