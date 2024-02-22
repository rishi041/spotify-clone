import axios from "axios";
import { reducerCases } from "../utils/Constants";
export const getInitialPlaylist = async (
  token,
  dispatch,
  selectedPlaylistId,
) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  );
  const selectedPlaylist = {
    id: response.data.id,
    name: response.data.name,
    description: response.data.description.startsWith("<a")
      ? ""
      : response.data.description,
    image: response.data.images[0].url,
    trackImage: response.data.tracks.items[0].track.album.images[2].url,
    preview_url: response.data.tracks.items[0].track.preview_url,
    tracks: response.data.tracks.items.map(({ track }) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => artist.name),
      trackImage: track.album.images[2].url,
      duration: track.duration_ms,
      album: track.album.name,
      context_uri: track.album.uri,
      preview_url: track.preview_url,
      track_number: track.track_number,
    })),
  };
  console.log(selectedPlaylist, "222selectedPlaylist");
  dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
};

export const playTrack = async (
  id,
  name,
  artists,
  trackImage,
  preview_url,
  context_uri,
  // track_number,
  // token,
  dispatch,
) => {
  const currentPlaying = {
    id,
    name,
    artists,
    trackImage,
    preview_url,
    context_uri,
  };

  dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
  dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  // const response = await axios.put(
  //   `https://api.spotify.com/v1/me/player/play`,
  //   {
  //     context_uri,
  //     offset: {
  //       position: track_number - 1,
  //     },
  //     position_ms: 0,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   },
  // );
  // if (response.status === 204) {

  // } else {
  //   dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  // }
};
