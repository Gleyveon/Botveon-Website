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