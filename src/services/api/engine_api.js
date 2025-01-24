import axios from 'axios'

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original"

const baseUrl = "http://127.0.0.1:8000";


//RECOMMENDATIONS 
export const fetchRecommendations = async (movies) => {
  console.log(movies)
  const res = await axios(
    {
      url: `${baseUrl}/recommendations`,
      method: 'post', 
      data: movies 
    }
  );
  return res?.data;
}
