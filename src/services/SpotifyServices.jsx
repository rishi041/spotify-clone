import apiClient from "./apiClient";
import { SET_USER_RAPID, SET_LOADING, SET_ERROR } from "../store/spotifySlice";

const User_Id = import.meta.env.VITE_USER_ID;

let userInfoController = null;

export const getUserInfoRapid = async (dispatch) => {
  if (userInfoController) {
    userInfoController.abort();
  }

  userInfoController = new AbortController();

  dispatch(SET_LOADING(true));
  dispatch(SET_ERROR(null));

  try {
    const { data } = await apiClient.get("/user_profile", {
      params: {
        id: User_Id,
        playlistLimit: "10",
        artistLimit: "10",
      },
      signal: userInfoController.signal,
    });

    const userInfoRapid = {
      userId: User_Id,
      userUrl: `https://open.spotify.com/user/${User_Id}`,
      name: data.name,
      product: "free",
      public_playlists: data.public_playlists,
    };

    dispatch(SET_USER_RAPID(userInfoRapid));
  } catch (error) {
    if (error.name === "CanceledError") {
      console.log("User info request was canceled:", error.message);
    } else {
      console.error("Error fetching user info:", error);
      dispatch(SET_ERROR("Failed to load user info"));
    }
  } finally {
    dispatch(SET_LOADING(false));
  }
};
