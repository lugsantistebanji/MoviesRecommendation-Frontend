import  { useState, useEffect } from 'react';
import GridComponent from './GridComponent.jsx';
import { fetchRecommendations } from '../services/api/engine_api.js'

const RecommendationComponent= ({details, directors, keywords, loading, watchedMovies}) => {
  

  const movie = {
    id: details?.id,
    tagline: details?.tagline,
    overview: details?.overview,
    directors: directors,
    keywords: keywords,
    genres: details?.genres.map((genre) => genre.name),

  };

  const movies = watchedMovies.concat(movie)

  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  !loading && useEffect(() => {
    setisLoading(true);
    fetchRecommendations(movies).then((res) => { 
      setData(res);
    }).catch((err) => console.log(err, 'err'))
    .finally(() => setisLoading(false));

  }, [])
  



  return (
    <>
      <GridComponent data={data} isLoading={loading || isLoading}/>
    </>
  )
}

export default RecommendationComponent;
