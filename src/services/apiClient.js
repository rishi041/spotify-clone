import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://spotify81.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_X_RAPID_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_X_RAPID_API_HOST,
  },
});

export default apiClient;
