import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #282828 0px, #383838 40px, #282828 80px);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export function CardSkeleton({ count = 32 }) {
  return (
    <CardContainer>
      <CardGrid>
        {Array.from({ length: count }).map((_, i) => (
          <CardItem key={i}>
            <SkeletonBase
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "6px",
              }}
            />
            <SkeletonBase
              style={{ width: "80%", height: "12px", marginTop: "10px" }}
            />
            <SkeletonBase
              style={{ width: "60%", height: "10px", marginTop: "4px" }}
            />
          </CardItem>
        ))}
      </CardGrid>
    </CardContainer>
  );
}

export function TrackListSkeleton({ count = 15 }) {
  return (
    <TrackListContainer>
      {Array.from({ length: count }).map((_, i) => (
        <TrackRow key={i}>
          <div className="col index">
            <SkeletonBase style={{ width: "16px", height: "14px" }} />
          </div>
          <div className="col detail">
            <SkeletonBase className="trackImg" />
            <div className="info">
              <SkeletonBase style={{ width: "65%", height: "13px" }} />
              <SkeletonBase
                style={{ width: "40%", height: "10px", marginTop: "6px" }}
              />
            </div>
          </div>
          <div className="col albumName">
            <SkeletonBase style={{ width: "70%", height: "13px" }} />
          </div>
          <div className="col duration">
            <SkeletonBase style={{ width: "32px", height: "13px" }} />
          </div>
        </TrackRow>
      ))}
    </TrackListContainer>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <ErrorContainer>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </ErrorContainer>
  );
}

const CardContainer = styled.div`
  padding: 1rem 1.5rem;
  min-height: calc(100vh - 180px);
  @media (max-width: 800px) {
    padding: 0.75rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1rem;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 0.75rem;
  }
  @media (max-width: 443px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.5rem;
  }
`;

const CardItem = styled.div`
  padding: 14px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  @media (max-width: 800px) {
    padding: 10px;
  }
  @media (max-width: 443px) {
    padding: 8px;
  }
`;

const TrackListContainer = styled.div`
  margin: 0 1rem;
  padding: 0.5rem 0;
  min-height: calc(100vh - 180px);
  margin-bottom: 5rem;
`;

const TrackRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 4px;
  .col {
    display: flex;
    align-items: center;
  }
  .detail {
    display: flex;
    gap: 1rem;
    .trackImg {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  color: white;
  gap: 1rem;
  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
  button {
    background-color: #1db954;
    color: white;
    border: none;
    padding: 0.6rem 2rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.2s,
      transform 0.1s;
    &:hover {
      background-color: #1ed760;
      transform: scale(1.04);
    }
  }
`;
