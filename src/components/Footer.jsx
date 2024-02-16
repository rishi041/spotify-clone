import styled from "styled-components";
// import Player from "./Player";
import MusicPlayer from "./MusicPlayer";
import {AiFillGithub, AiFillInstagram} from "react-icons/ai"
import {FaLinkedinIn} from "react-icons/fa"

export default function Footer() {
  return (
    <Container>
      <MusicPlayer />
      <div>
        <div>
        <div  className="footer-copywright">
          <h3>Designed and Developed by Shubham Pawar</h3>
        </div>
        <div  className="footer-copywright">
          <h3>Copyright © {year} SP</h3>
        </div>
        <div  className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/shubhampawar7/"
                style={{ divor: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/shubhampawar-/"
                style={{ divor: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/shubhampawar__07/"
                style={{ divor: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
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
