import styled from "styled-components";
import Playlists from "./Playlists";
export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
          {/* RDG Spotify Clone */}
        </div>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      color: white;
      text-align: start;
      margin: 1rem 0;
      padding: 0 0.4rem;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
  @media (max-width: 800px) {
    width: 0;
  }
`;
