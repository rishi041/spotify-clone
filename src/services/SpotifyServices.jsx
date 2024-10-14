import axios from "axios";
import { SET_USER_RAPID } from '../store/spotifySlice';

const X_RapidAPI_Key = import.meta.env.VITE_X_RAPID_API_KEY;
const X_RapidAPI_Host = import.meta.env.VITE_X_RAPID_API_HOST;
const User_Id = import.meta.env.VITE_USER_ID;

// Declare an AbortController for the user info request
let userInfoController = null;

export const getUserInfoRapid = async (dispatch) => {
  // Cancel previous request if it exists
  if (userInfoController) {
    userInfoController.abort();
  }

  // Create a new AbortController
  userInfoController = new AbortController();

  try {
    const { data } = await axios.get(
      "https://spotify81.p.rapidapi.com/user_profile",
      {
        params: {
          id: User_Id,
          playlistLimit: "10",
          artistLimit: "10",
        },
        headers: {
          "X-RapidAPI-Key": X_RapidAPI_Key,
          "X-RapidAPI-Host": X_RapidAPI_Host,
        },
        signal: userInfoController.signal,  // Pass the signal to Axios
      },
    );

    const userInfoRapid = {
      userId: User_Id,
      userUrl: `https://open.spotify.com/user/${User_Id}`,
      name: data.name,
      product: "free",
      public_playlists: data.public_playlists,
    };

    dispatch(SET_USER_RAPID(userInfoRapid));
  } catch (error) {
    if (error.name === 'CanceledError') {
      console.log("User info request was canceled:", error.message);
    } else {
      console.error("Error fetching user info:", error);
    }
  }
};
