import apiClient from "./apiClient";
import {
  SET_PLAYLIST_RAPID,
  SET_LOADING,
  SET_ERROR,
} from "../store/spotifySlice";

let playlistController = null;

export const getInitialPlaylistRapid = async (dispatch, selectedPlaylistId) => {
  if (playlistController) {
    playlistController.abort();
  }

  playlistController = new AbortController();

  dispatch(SET_LOADING(true));
  dispatch(SET_ERROR(null));

  try {
    const response = await apiClient.get("/playlist", {
      params: { id: selectedPlaylistId },
      signal: playlistController.signal,
    });

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

    dispatch(SET_PLAYLIST_RAPID(selectedPlaylistRapid));
  } catch (error) {
    if (error.name === "CanceledError") {
      console.log("Playlist request was canceled:", error.message);
    } else {
      console.error("Error fetching the playlist:", error);
      dispatch(SET_ERROR("Failed to load playlist"));
    }
  } finally {
    dispatch(SET_LOADING(false));
  }
};
