import axios from "axios";
import { reducerCases } from "../utils/Constants";

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
        "X-RapidAPI-Key": "e49cd1581dmshcfad5d553319a2bp152436jsn04b1c2d2b5fd",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
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
