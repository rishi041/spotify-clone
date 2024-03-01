import { useEffect, useRef, useState } from "react";
import { getUserInfoRapid } from "../services/SpotifyServices";
import { useStateProvider } from "../utils/StateProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Body from "./Body";
import Home from "./Home";
import SearchPage from "./SearchPage";

export default function Spotify() {
  const [{ }, dispatch] = useStateProvider();

  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
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
    // window.history.pushState({}, '', '/');
  }, []);

  useEffect(() => {
    // getUserInfo(dispatch, token);
    getUserInfoRapid(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //   getPlaybackState(dispatch, token);
  // }, [dispatch, token]);

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
                  element={<SearchPage headerBackground={headerBackground} />}
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
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      // width: 100vw;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
