import { css } from "styled-components";

export const trackListStyles = css`
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 64px;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ $headerBackground }) =>
        $headerBackground ? "#000000dc" : "none"};
      @media (max-width: 800px) {
        top: 56px;
        padding: 0.75rem 1.5rem;
        grid-template-columns: 0.3fr 3fr 1.5fr 0.1fr;
      }
      @media (max-width: 443px) {
        top: 48px;
        grid-template-columns: 0.3fr 3fr 0.1fr 0.1fr;
        padding: 0.75rem 1rem;
        .albumName {
          display: none;
        }
      }
    }
    .tracks {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
        border-radius: 4px;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          font-size: 0.875rem;
          img {
            height: 40px;
            width: 40px;
            border-radius: 4px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              font-weight: 600;
              color: #fff;
            }
            .artistsName {
              font-size: 0.7rem;
              color: #b3b3b3;
            }
          }
        }
        @media (max-width: 800px) {
          grid-template-columns: 0.3fr 3fr 1.5fr 0.1fr;
          padding: 0.5rem 0.5rem;
        }
        @media (max-width: 443px) {
          grid-template-columns: 0.3fr 3fr 0.1fr 0.1fr;
          .albumName {
            display: none;
          }
        }
      }
    }
  }
`;
