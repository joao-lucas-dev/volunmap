import axios from "axios";

const api = axios.create({
  baseURL: "http://solidarityevents.herokuapp.com/api",
});

export default api;