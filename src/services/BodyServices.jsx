import axios from "axios";
import { reducerCases } from "../utils/Constants";
const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

export const getInitialPlaylistRapid = async (dispatch, selectedPlaylistId) => {
  const response = await axios.get(
    `https://spotify81.p.rapidapi.com/playlist`,
    {
      params: {
        id: selectedPlaylistId,
      },
      headers: {
        "X-RapidAPI-Key": X_RapidAPI_Key,
        "X-RapidAPI-Host": X_RapidAPI_Host,
      },
    }
  );
  const selectedPlaylistRapid = {
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
      trackImageHome: track.album.images[1].url,
      trackImage: track.album.images[2].url,
      duration: track.duration_ms,
      album: track.album.name,
      context_uri: track.uri,
      preview_url: track.preview_url,
      track_number: track.track_number,
    })),
  };

  dispatch({ type: reducerCases.SET_PLAYLIST_RAPID, selectedPlaylistRapid });
};

export const playTrackRapid = async (
  dispatch,
  id,
  name,
  artists,
  trackImage,
  // preview_url,
  context_uri
  // track_number,
  // token,
) => {
  const url = `https://spotify81.p.rapidapi.com/tracks`;

  const response = await axios.get(url, {
    params: {
      ids: id,
    },
    headers: {
      "X-RapidAPI-Key": X_RapidAPI_Key,
      "X-RapidAPI-Host": X_RapidAPI_Host,
    },
  });
  if (response.status === 200) {
    const currentPlaying = {
      id,
      name,
      artists,
      trackImage,
      preview_url: response.data.tracks[0].preview_url,
      context_uri,
    };

    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
  } else {
  }
};
