import styled from "styled-components";
// import SpotifyPlayerPremium from "./SpotifyPlayerPremium";
import MusicPlayer from "./MusicPlayer";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  // const [{ userInfo }] = useStateProvider();

  return (
    <Container>
      {/* {userInfo && userInfo?.product !== "premium" ? (//
        <SpotifyPlayerPremium />
      ) : ()} */}
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
  // display: grid;
  // grid-template-divumns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  // background: linear-gradient(rgb(24 64 74), black);
  .copyrightContainer {
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 0.8rem;
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
  }
`;
