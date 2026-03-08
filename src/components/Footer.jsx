import styled from "styled-components";
import MusicPlayer from "./MusicPlayer";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <Container>
      <div className="playerSection">
        <MusicPlayer />
      </div>
      <div className="copyrightContainer">
        <div className="footerCopywright">
          <span>Designed and Developed by Rushikesh Ganorkar</span>
        </div>
        <div className="footerCopywright">
          <span>Copyright &copy; 2024 RG</span>
        </div>
        <div className="footerIcons">
          <a
            href="https://github.com/rishi041/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/rushikesh-ganorkar-rd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </a>
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .playerSection {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: 100%;
  }
  .copyrightContainer {
    color: #b3b3b3;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.65rem;
    padding: 4px 1rem;
    border-top: 1px solid #282828;
    flex-shrink: 0;
    .footerCopywright {
      white-space: nowrap;
    }
    .footerIcons {
      display: flex;
      gap: 0.8rem;
      a {
        color: #b3b3b3;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s;
        &:hover {
          color: white;
        }
      }
    }
    @media (max-width: 800px) {
      display: none;
    }
  }
  @media (max-width: 800px) {
    padding-bottom: 68px;
  }
`;
