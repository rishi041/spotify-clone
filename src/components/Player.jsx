// import { useEffect, useState } from "react";
// // import SpotifyPlayer from "react-spotify-web-playback";

// import MusicPlayer from "./MusicPlayer";

// export default function Player() {
//   const [play, setPlay] = useState(false);

//   // useEffect(() => {
//   //   console.log(currentPlaying, "currentPlaying");
//   // }, [currentPlaying]);

//   if (!token) return null;
//   return (
//     <>
//       {/* <SpotifyPlayer
//         token={token}
//         showSaveIcon
//         callback={(state) => {
//           console.log(state, "state");
//           if (!state.isPlaying) setPlay(true);
//         }}
//         play={play}
//         uris={
//           selectedPlaylist ? [`${selectedPlaylist.tracks[0].context_uri}`] : []
//         }
//         styles={{
//           bgColor: "rgb(24, 24, 24)",
//           color: "#fff",
//           loaderColor: "#fff",
//           sliderColor: "#1cb954",
//           savedColor: "#fff",
//           trackArtistColor: "#ccc",
//           trackNameColor: "#fff",
//         }}
//       /> */}

//       {/* <div> music Name: {selectedPlaylist?.tracks[0].name} </div> */}

//       {currentPlaying != null ? (
//         // <audio controls src={currentPlaying?.preview_url} />
//         <MusicPlayer data={currentPlaying} />
//       ) : (
//         <MusicPlayer data={currentPlaying} />
//         <audio controls src={} />
//       )}
//     </>
//   );
// }
