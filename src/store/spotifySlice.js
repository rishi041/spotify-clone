import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userInfoRapid: null,
  playlistsRapid: [],
  currentPlaying: null,
  selectedPlaylistRapid: null,
  selectedPlaylistId: "37i9dQZF1DWXtlo6ENS92N",
  searchPlaylistRapid: [],
  isLoading: false,
  error: null,
  isSearching: false,
  searchError: null,
};

export const spotifySlice = createSlice({
  name: "spotifyData",
  initialState,
  reducers: {
    SET_USER_RAPID: (state, action) => {
      state.userInfoRapid = action.payload;
    },
    SET_PLAYLISTS_RAPID: (state, action) => {
      state.playlistsRapid = action.payload;
    },
    SET_PLAYING: (state, action) => {
      state.currentPlaying = action.payload;
    },
    SET_PLAYLIST_RAPID: (state, action) => {
      state.selectedPlaylistRapid = action.payload;
    },
    SET_PLAYLIST_ID: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
    SET_SEARCH_RAPID: (state, action) => {
      state.searchPlaylistRapid = action.payload;
    },
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    SET_SEARCHING: (state, action) => {
      state.isSearching = action.payload;
    },
    SET_SEARCH_ERROR: (state, action) => {
      state.searchError = action.payload;
    },
  },
});

export const {
  SET_USER_RAPID,
  SET_PLAYLISTS_RAPID,
  SET_PLAYING,
  SET_PLAYLIST_RAPID,
  SET_PLAYLIST_ID,
  SET_SEARCH_RAPID,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCHING,
  SET_SEARCH_ERROR,
} = spotifySlice.actions;

export default spotifySlice.reducer;
