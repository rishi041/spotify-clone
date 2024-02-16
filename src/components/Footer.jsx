import styled from "styled-components";
// import Player from "./Player";
import MusicPlayer from "./MusicPlayer";
import {AiFillGithub, AiFillInstagram} from "react-icons/ai"
import {FaLinkedinIn} from "react-icons/fa"

export default function Footer() {
  return (
    <Container>
      <MusicPlayer />
      <AiFillGithub/>
      <AiFillInstagram/>
      <FaLinkedinIn/>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-divor: #181818;
  border-top: 1px solid #282828;
  // display: grid;
  // grid-template-divumns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;
