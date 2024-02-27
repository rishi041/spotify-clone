import axios from "axios";
import { reducerCases } from "../utils/Constants";
const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;

export const getUserInfoRapid = async (dispatch) => {
  const { data } = await axios.get(
    "https://spotify81.p.rapidapi.com/user_profile",
    {
      params: {
        id: "c58e5jvzwc47uaecx4zudqz25",
        playlistLimit: "10",
        artistLimit: "10",
      },
      headers: {
        "X-RapidAPI-Key": X_RapidAPI_Key,
        "X-RapidAPI-Host": X_RapidAPI_Host,
      },
    },
  );
  const userInfoRapid = {
    userId: "c58e5jvzwc47uaecx4zudqz25",
    userUrl: "https://open.spotify.com/user/c58e5jvzwc47uaecx4zudqz25",
    name: data.name,
    product: "free",
    public_playlists: data.public_playlists,
  };

  dispatch({ type: reducerCases.SET_USER_RAPID, userInfoRapid: userInfoRapid });
};
