import styled from "styled-components";
import { UserAuth } from "../services/LoginServices";
export default function Login() {
  const handleClick = () => {
    UserAuth();
  };

  return (
    <Container>
{/*       <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      /> */}
      <svg aria-label="Spotify for Developers" xmlns="http://www.w3.org/2000/svg" width="240" height="34"><use href="/images/spotify-for-developers-logo.svg#s4d-logo"></use></svg>
      <button onClick={handleClick}>Connect RDG Spotify Clone</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
