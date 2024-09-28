import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  userInfoRapid: null,
  playlistsRapid: [],
  currentPlaying: null,
  selectedPlaylistRapid: null,
  selectedPlaylistId: "37i9dQZF1DWXtlo6ENS92N",
  searchPlaylistRapid: [],
};

export const spotifySlice = createSlice({
  name: "spotifyData",
  initialState,
  reducers: {
    SET_USER_RAPID: (state, action) => {
      return {
        ...state,
        userInfoRapid: action.payload,
      }
    },
    SET_PLAYLISTS_RAPID: (state, action) => {
      return {
        ...state,
        playlistsRapid: action.payload,
      };
    },
    SET_PLAYING: (state, action) => {
      return {
        ...state,
        currentPlaying: action.payload,
      };
    },
    SET_PLAYLIST_RAPID: (state, action) => {
      return {
        ...state,
        selectedPlaylistRapid: action.payload,
      };
    },
    SET_PLAYLIST_ID: (state, action) => {
      return {
        ...state,
        selectedPlaylistId: action.payload,
      };
    },
    SET_SEARCH_RAPID: (state, action) => {
      return {
        ...state,
        searchPlaylistRapid: action.payload,
      };
    }
  }
})

export const { SET_USER_RAPID, SET_PLAYLISTS_RAPID, SET_PLAYING, SET_PLAYLIST_RAPID, SET_PLAYLIST_ID, SET_SEARCH_RAPID } = spotifySlice.actions
export default spotifySlice.reducer
