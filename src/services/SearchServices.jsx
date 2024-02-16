import axios from "axios";
import { reducerCases } from "../utils/Constants";

export const getSearchData = async (token, dispatch, search) => {
  try {
    let data = search
      .split("")
      .map((char) => (char === " " ? "%20" : char))
      .join("");
    const url = `https://api.spotify.com/v1/search?q=${data}&type=track`;

    await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const searchPlaylistData = response.data;
        dispatch({
          type: reducerCases.SET_SEARCH,
          searchPlaylist: searchPlaylistData,
        });
      });
  } catch (ex) {
    console.log("Error in get messages ", ex.message);
    dispatch({ type: reducerCases.SET_SEARCH, searchPlaylist: [] });
  }
};
