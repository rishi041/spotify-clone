import axios from "axios";
import { SET_SEARCH_RAPID } from '../store/spotifySlice';

const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

let controller = null; // Declare the AbortController globally in this module

export const getSearchRapidData = async (dispatch, search) => {
  // Cancel the previous request if it's still active
  if (controller) {
    controller.abort();
  }

  // Create a new controller for the current request
  controller = new AbortController();

  try {
    const url = `https://spotify81.p.rapidapi.com/search`;
    
    const response = await axios.get(url, {
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
      signal: controller.signal,  // Pass the signal to Axios
    });

    const searchPlaylistRapid = response.data;
    dispatch(SET_SEARCH_RAPID(searchPlaylistRapid));

  } catch (ex) {
    if (ex.name === 'CanceledError') {
      console.log("Request was canceled:", ex.message);
    } else {
      console.log("Error in getSearchRapidData:", ex.message);
      dispatch(SET_SEARCH_RAPID([]));  // Handle the error case
    }
  }
};
