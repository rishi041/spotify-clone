import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";

import SpotifyPlayer from "react-spotify-web-playback";

export default function SpotifyPlayerPremium() {
  const [play, setPlay] = useState(false);
  const [{ token, selectedPlaylist, currentPlaying }] = useStateProvider();

  if (!token) return null;
  return (
    <>
      <SpotifyPlayer
        token={token}
        showSaveIcon
        callback={(state) => {
          console.log(state, "state");
          if (!state.isPlaying) setPlay(true);
        }}
        play={play}
        uris={
          currentPlaying?.context_uri
            ? [`${currentPlaying?.context_uri}`]
            : selectedPlaylist
              ? [`${selectedPlaylist.tracks[0].context_uri}`]
              : []
        }
        styles={{
          bgColor: "rgb(24, 24, 24)",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          savedColor: "#fff",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />

      {/* <div> music Name: {selectedPlaylist?.tracks[0].name} </div> */}
    </>
  );
}
