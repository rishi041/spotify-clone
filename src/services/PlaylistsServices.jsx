import apiClient from "./apiClient";
import {
  SET_PLAYLISTS_RAPID,
  SET_LOADING,
  SET_ERROR,
} from "../store/spotifySlice";

let playlistController = null;

export const getPlaylistDataRapid = async (dispatch) => {
  if (playlistController) {
    playlistController.abort();
  }

  playlistController = new AbortController();

  dispatch(SET_LOADING(true));
  dispatch(SET_ERROR(null));

  try {
    const response = await apiClient.get("/playlist_tracks", {
      params: {
        id: "0DXBqtM4rFRMiefHemzDXV",
        offset: "0",
        limit: "100",
      },
      signal: playlistController.signal,
    });

    const { items } = response.data;
    const playlistsRapid = items.map(({ track }) => ({
      name: track.name,
      id: track.id,
    }));

    dispatch(SET_PLAYLISTS_RAPID(playlistsRapid));
  } catch (error) {
    if (error.name === "CanceledError") {
      console.log("Playlist request was canceled:", error.message);
    } else {
      console.error("Error fetching the playlist:", error);
      dispatch(SET_ERROR("Failed to load playlists"));
    }
  } finally {
    dispatch(SET_LOADING(false));
  }
};
