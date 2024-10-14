import axios from "axios";
import { SET_PLAYLISTS_RAPID } from '../store/spotifySlice';

const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

// Declare an AbortController for the playlist request
let playlistController = null;

export const getPlaylistDataRapid = async (dispatch) => {
  // Cancel previous request if it exists
  if (playlistController) {
    playlistController.abort();
  }

  // Create a new AbortController
  playlistController = new AbortController();

  try {
    const response = await axios.get(
      "https://spotify81.p.rapidapi.com/playlist_tracks",
      {
        params: {
          id: "0DXBqtM4rFRMiefHemzDXV",
          offset: "0",
          limit: "100",
        },
        headers: {
          "X-RapidAPI-Key": X_RapidAPI_Key,
          "X-RapidAPI-Host": X_RapidAPI_Host,
        },
        signal: playlistController.signal,  // Pass the signal to Axios
      },
    );

    const { items } = response.data;
    const playlistsRapid = items.map(({ track }) => ({
      name: track.name,
      id: track.id
    }));

    dispatch(SET_PLAYLISTS_RAPID(playlistsRapid));
  } catch (error) {
    if (error.name === 'CanceledError') {
      console.log("Playlist request was canceled:", error.message);
    } else {
      console.error("Error fetching the playlist:", error);
    }
  }
};
