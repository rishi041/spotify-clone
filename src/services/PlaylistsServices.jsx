import axios from "axios";
import { reducerCases } from "../utils/Constants";
const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

export const getPlaylistDataRapid = async (dispatch) => {
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
    },
  );
  const { items } = response.data;
  const playlistsRapid = items.map(({ track }) => {
    return { name: track.name, id: track.id };
  });
  dispatch({ type: reducerCases.SET_PLAYLISTS_RAPID, playlistsRapid });
};
