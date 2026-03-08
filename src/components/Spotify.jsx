import { useEffect, useRef, useState } from "react";
import { getUserInfoRapid } from "../services/SpotifyServices";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Body from "./Body";
import Home from "./Home";
import SearchPage from "./SearchPage";
import { useDispatch } from "react-redux";

export default function Spotify() {
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const dispatch = useDispatch();
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    getUserInfoRapid(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <BrowserRouter>
        <div className="spotify__body">
          <Sidebar />
          <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
            <Navbar navBackground={navBackground} />
            <div className="body__contents">
              <Routes>
                <Route
                  path="/"
                  element={<Home headerBackground={headerBackground} />}
                />
                <Route
                  path="/playlists"
                  element={<Body headerBackground={headerBackground} />}
                />
                <Route
                  path="/search"
                  element={<SearchPage navBackground={navBackground} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>

      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 90px;
  .spotify__body {
    display: grid;
    grid-template-columns: 240px 1fr;
    font-size: 0.875rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    overflow: hidden;
    .body {
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
        }
      }
    }
    @media (max-width: 800px) {
      grid-template-columns: 0 100%;
      .body {
        padding-bottom: 56px;
      }
    }
  }
  .spotify__footer {
    z-index: 2;
    position: relative;
  }
  @media (max-width: 800px) {
    grid-template-rows: 1fr 140px;
  }
  @media (max-width: 443px) {
    grid-template-rows: 1fr 135px;
  }
`;
