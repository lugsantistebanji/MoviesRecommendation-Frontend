import axios from 'axios'

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imageOriginalPAth = "https://image.tmdb.org/t/p/original"

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// TRENDING - HOME
export const fetchTrending = async (timeWindow = 'day', language = 'en-US') => {
  const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?language=${language}&api_key=${apiKey}`);
  return data?.results;
};

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};
