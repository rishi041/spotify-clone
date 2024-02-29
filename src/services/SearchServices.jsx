import axios from "axios";
import { reducerCases } from "../utils/Constants";

const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

export const getSearchRapidData = async (dispatch, search, navigate) => {

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
          type: "tracks",
          offset: "0",
          limit: "50",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key": X_RapidAPI_Key,
          "X-RapidAPI-Host": X_RapidAPI_Host,
        },
      })
      .then((response) => {
        const searchPlaylistRapidData = response.data;
        navigate('/playlists')
        dispatch({
          type: reducerCases.SET_SEARCH_RAPID,
          searchPlaylistRapid: searchPlaylistRapidData,
        });
      });
  } catch (ex) {
    console.log("Error in get messages ", ex.message);

    dispatch({
      type: reducerCases.SET_SEARCH_RAPID,
      searchPlaylistRapid: [],
    });
  }
};
