import styled from "styled-components";
import MusicPlayer from "./MusicPlayer";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {

  return (
    <Container>
      <MusicPlayer />
      <div className="copyrightContainer">
        <div div className="footerCopywright">
          <div>Designed and Developed by Rushikesh Ganorkar</div>
        </div>
        <div div className="footerCopywright">
          <div>Copyright © 2024 RG</div>
        </div>
        <div div className="footerBody">
          <div className="footerIcons">
            <div className="socialIcons">
              <a
                href="https://github.com/rishi041/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <AiFillGithub />
              </a>
            </div>
            <div className="socialIcons">
              <a
                href="https://www.linkedin.com/in/rushikesh-ganorkar-rd/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <FaLinkedinIn />
              </a>
            </div>
            <div className="socialIcons">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <AiFillInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  padding: 0 1rem;
  margin-bottom: 2rem;
  .copyrightContainer {
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 0.7rem;
    position: absolute;
    bottom: 0rem;
    width: 98vw;
    .footerCopywright {
    }
    .footerBody {
    }
    .footerIcons {
      display: flex;
      align-items: flex-end;
      flex-direction: row;
      justify-content: space-around;
      .socialIcons {
        padding: 0 0.5rem;
      }
    }
    @media (max-width: 800px) {
      position: absolute;
      bottom: 0rem;
      background: #181818;
      font-size: 0.7rem;
      flex-direction: row;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-evenly;
    }
    @media (max-width: 443px) {
      font-size: 0.5rem;
    }
  }
  @media (max-width: 800px) {
    padding: 0;
  }
`;
