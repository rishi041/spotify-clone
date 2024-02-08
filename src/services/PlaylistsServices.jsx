import axios from "axios";
import { reducerCases } from "../utils/Constants";

export const getPlaylistData = async (token, dispatch) => {
  const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const { items } = response.data;
  const playlists = items.map(({ name, id }) => {
    return { name, id };
  });
  dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
};
