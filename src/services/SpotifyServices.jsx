import axios from "axios";
import { reducerCases } from "../utils/Constants";

export const getUserInfo = async (dispatch, token) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const userInfo = {
    userId: data.id,
    userUrl: data.external_urls.spotify,
    name: data.display_name,
  };
  dispatch({ type: reducerCases.SET_USER, userInfo });
};

export const getPlaybackState = async (dispatch, token) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  dispatch({
    type: reducerCases.SET_PLAYER_STATE,
    playerState: data.is_playing,
  });
};
