import axios from "axios";
import { reducerCases } from "../utils/Constants";

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
        "X-RapidAPI-Key": "e49cd1581dmshcfad5d553319a2bp152436jsn04b1c2d2b5fd",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      },
    },
  );
  const { items } = response.data;
  const playlistsRapid = items.map(({ track }) => {
    return { name: track.name, id: track.id };
  });
  dispatch({ type: reducerCases.SET_PLAYLISTS_RAPID, playlistsRapid });
};
