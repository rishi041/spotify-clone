import { reducerCases } from "./Constants";

export const initialState = {
  userInfoRapid: null,
  playlistsRapid: [],
  currentPlaying: null,
  selectedPlaylistRapid: null,
  selectedPlaylistId: "37i9dQZF1DWXtlo6ENS92N",
  searchPlaylistRapid: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_RAPID:
      return {
        ...state,
        userInfoRapid: action.userInfoRapid,
      };
    case reducerCases.SET_PLAYLISTS_RAPID:
      return {
        ...state,
        playlistsRapid: action.playlistsRapid,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYLIST_RAPID:
      return {
        ...state,
        selectedPlaylistRapid: action.selectedPlaylistRapid,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_SEARCH_RAPID:
      return {
        ...state,
        searchPlaylistRapid: action.searchPlaylistRapid,
      };

    default:
      return state;
  }
};

export default reducer;
