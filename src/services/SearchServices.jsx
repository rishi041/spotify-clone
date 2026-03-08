import apiClient from "./apiClient";
import {
  SET_SEARCH_RAPID,
  SET_SEARCHING,
  SET_SEARCH_ERROR,
} from "../store/spotifySlice";

let controller = null;

export const getSearchRapidData = async (dispatch, search) => {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  dispatch(SET_SEARCHING(true));
  dispatch(SET_SEARCH_ERROR(null));

  try {
    const response = await apiClient.get("/search", {
      params: {
        q: search,
        type: "tracks",
        offset: "0",
        limit: "50",
        numberOfTopResults: "5",
      },
      signal: controller.signal,
    });

    const searchPlaylistRapid = response.data;
    dispatch(SET_SEARCH_RAPID(searchPlaylistRapid));
  } catch (ex) {
    if (ex.name === "CanceledError") {
      console.log("Request was canceled:", ex.message);
    } else {
      console.log("Error in getSearchRapidData:", ex.message);
      dispatch(SET_SEARCH_RAPID([]));
      dispatch(SET_SEARCH_ERROR("Search failed. Please try again."));
    }
  } finally {
    dispatch(SET_SEARCHING(false));
  }
};
