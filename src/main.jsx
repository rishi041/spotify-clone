import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import spotifyReducer from './utils/SpotifyReducer'
import "./index.css";

export const store = configureStore({
  reducer: {
    spotifyData: spotifyReducer
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <App />
  </Provider>

);
