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
      context_uri: track.uri,
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
  console.log(currentPlaying, "currentPlaying")
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

export const playTrackRapid = async (
  id,
  name,
  artists,
  trackImage,
  // preview_url,
  context_uri,
  // track_number,
  // token,
  dispatch,
) => {

  const url = `https://spotify81.p.rapidapi.com/tracks`;

  const response = await axios.get(
    url, {
    params: {
      ids: id
    },
    headers: {
      'X-RapidAPI-Key': 'e49cd1581dmshcfad5d553319a2bp152436jsn04b1c2d2b5fd',
      'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
  }
  );
  if (response.status === 200) {
    const currentPlaying = {
      id,
      name,
      artists,
      trackImage,
      preview_url: response.data.tracks[0].preview_url,
      context_uri,
    };
    console.log(currentPlaying, "currentPlaying")
    // console.log(response.data[0].url, "response.dataQQQ")
    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  } else {
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  }
};
