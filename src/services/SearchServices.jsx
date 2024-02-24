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


export const getSearchRapidData = async (dispatch, search) => {
  try {
    // let data = search
    //   .split("")
    //   .map((char) => (char === " " ? "%20" : char))
    //   .join("");
    const url = `https://spotify81.p.rapidapi.com/search`;

    await axios
      .get(url, {
        params: {
          q: search,
          type: 'tracks',
          offset: '0',
          limit: '50',
          numberOfTopResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': 'e49cd1581dmshcfad5d553319a2bp152436jsn04b1c2d2b5fd',
          'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
      })
      .then((response) => {
        const searchPlaylistData = response.data;
        dispatch({
          type: reducerCases.SET_SEARCH_RAPID,
          searchPlaylistRapid: searchPlaylistData,
        });
      });
  } catch (ex) {
    console.log("Error in get messages ", ex.message);
    dispatch({ type: reducerCases.SET_SEARCH_RAPID, searchPlaylistRapid: [] });
  }
};