import axios from "axios";
import { SET_PLAYLIST_RAPID, SET_PLAYING } from "../store/spotifySlice";

const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

// Declare AbortControllers for each request type globally
let playlistController = null;
let trackController = null;

// Function to get the initial playlist
export const getInitialPlaylistRapid = async (dispatch, selectedPlaylistId) => {
  // Cancel previous request if it exists
  if (playlistController) {
    playlistController.abort();
  }

  // Create a new AbortController
  playlistController = new AbortController();

  try {
    const response = await axios.get(
      `https://spotify81.p.rapidapi.com/playlist`,
      {
        params: { id: selectedPlaylistId },
        headers: {
          "X-RapidAPI-Key": X_RapidAPI_Key,
          "X-RapidAPI-Host": X_RapidAPI_Host,
        },
        signal: playlistController.signal,  // Pass the signal to Axios
      }
    );

    const selectedPlaylistRapid = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith("<a") ? "" : response.data.description,
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
    if (error.name === 'CanceledError') {
      console.log("Playlist request was canceled:", error.message);
    } else {
      console.error("Error fetching the playlist:", error);
    }
  }
};

// Function to play a specific track
export const playTrackRapid = async (dispatch, id, name, artists, trackImage, context_uri) => {
  // Cancel previous request if it exists
  if (trackController) {
    trackController.abort();
  }

  // Create a new AbortController
  trackController = new AbortController();

  try {
    const url = `https://spotify81.p.rapidapi.com/tracks`;
    const response = await axios.get(url, {
      params: { ids: id },
      headers: {
        "X-RapidAPI-Key": X_RapidAPI_Key,
        "X-RapidAPI-Host": X_RapidAPI_Host,
      },
      signal: trackController.signal,  // Pass the signal to Axios
    });

    const currentPlaying = {
      id,
      name,
      artists,
      trackImage,
      preview_url: response.data.tracks[0].preview_url,
      context_uri,
    };

    dispatch(SET_PLAYING(currentPlaying));
  } catch (error) {
    if (error.name === 'CanceledError') {
      console.log("Track request was canceled:", error.message);
    } else {
      console.error("Error fetching the track:", error);
    }
  }
};
