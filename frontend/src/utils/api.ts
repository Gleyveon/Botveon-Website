import axios, { mergeConfig } from "axios";
import { Guild } from "./types";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {

    const skipAuthRedirect = error.config?.headers?.["skip-auth-redirect"];
    
    if (skipAuthRedirect) {
      return Promise.reject(error);
    };

    if (error.response?.status === 401 || error.response?.status === 403) {

      const currentUrl = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
      
      // Redirect to the login page
      window.location.href = `http://localhost:3001/api/auth/discord?redirect=${encodeURIComponent(currentUrl)}`;
    }
    return Promise.reject(error); // Reject the error so it can still be handled locally if needed
  }
);

export default api;

export const fetchUser = async () => {
  try {
    const response = await api.get('/auth/user', {
      headers: {
        "skip-auth-redirect": "true",
      }
    });
    console.log(API_BASE_URL);
    console.log('Full response:', response)
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
};

export const fetchMutualGuilds = async () => {
  try {
    const response = await api.get('/guilds');
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
};

export const fetchCommunitySettings = async (guildID: string) => {
  try {
    const response = await api.get(`/guilds/${guildID}/community`);
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
}

export const updateCommunitySettings = async (guildID: string, settings: { threadChannels: string[]; upvoteChannels: string[]; bumpChannel: string | undefined }) => {
  try {
    const response = await api.post(`/guilds/${guildID}/community`, settings);
    return response.data;
  } catch (err) {
    console.error('Error submitting settings: ', err);
    throw err;
  }
};

export const fetchJoinSettings = async (guildID: string) => {
  try {
    const response = await api.get(`/guilds/${guildID}/join`);
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
}

export const updateJoinSettings = async (guildID: string, settings: any ) => {
  try {
    const response = await api.post(`/guilds/${guildID}/join`, settings);
    return response.data;
  } catch (err) {
    console.error('Error submitting settings: ', err);
    throw err;
  }
};

export const fetchEconomySettings = async (guildID: string) => {
  try {
    const response = await api.get(`/guilds/${guildID}/economy`);
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
}

export const updateEconomySettings = async (guildID: string, settings: any ) => {
  try {
    const response = await api.post(`/guilds/${guildID}/economy`, settings);
    return response.data;
  } catch (err) {
    console.error('Error submitting settings: ', err);
    throw err;
  }
};

export const fetchLevelSettings = async (guildID: string) => {
  try {
    const response = await api.get(`/guilds/${guildID}/level`);
    return response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
    throw err;
  }
}

export const updateLevelSettings = async (guildID: string, settings: any ) => {
  try {
    const response = await api.post(`/guilds/${guildID}/level`, settings);
    return response.data;
  } catch (err) {
    console.error('Error submitting settings: ', err);
    throw err;
  }
};