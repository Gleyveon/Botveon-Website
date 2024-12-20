import axios from "axios";
import { Guild } from "./types";

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const fetchMutualGuilds = async () => {
    try {
      const response = await api.get('/guilds');
      return response.data;
    } catch (err) {
        console.error('Error fetching data: ', err);
        throw err;
    }
  };