import axios from 'axios'

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original"

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// TRENDING - HOME
export const fetchTrending = async (timeWindow = 'day', language = 'en-US') => {
  const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?language=${language}&api_key=${apiKey}`);
  return data?.results;
};


// MOVIES AND SERIES - details

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// MOVIES AND SERIES - credits
export const fetchCredits = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
  return res?.data;
}

export const fetchVideos = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
  return res?.data;
}

// DISCOVER 
export const fetchDiscovers = async (type, page, sortBy) => {
  const res = await axios.get(`${baseUrl}/discover/${type}?page=${page}&api_key=${apiKey}&sort_by=${sortBy}`); 
  return res?.data;
}

// SEARCH
export const searchData = async (query, page) => {
  const res = await axios.get(`${baseUrl}/search/multi?query=${query}&page=${page}&api_key=${apiKey}`);
  return res?.data;
}

//RECOMMENDATIONS 
export const fetchRecommendations = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/recommendations?api_key=${apiKey}`);
  return res?.data;
}
