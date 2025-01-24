import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { fetchDetails, imagePath, imagePathOriginal, fetchCredits, fetchVideos, fetchRecommendations, fetchKeywords } from "../services/api/tmdb.js";
import { Flex, Spinner,Text, Box, Container, Badge, Button, Image, CircularProgress, CircularProgressLabel, Heading} from "@chakra-ui/react";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon } from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor, fromMinutesToHours } from '../utils/helpers.js'
import CastComponent from "../components/CastComponent.jsx";
import VideoComponent from '../components/VideoComponent.jsx';
import GridComponent from '../components/GridComponent.jsx';
import RecommendationComponent from '../components/RecommendationComponent.jsx';


const DetailsPage = () => {
  const router = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [directors, setDirectors] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const { type, id } = router; 
  const [cast, setCast] = useState([]);
  const [data, setData] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([])



  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try{
        const [detailsData, creditsData, videosData, recomendationsData, keywordsData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
          fetchRecommendations(type, id),
          fetchKeywords(type, id),
        ]);

        setDetails(detailsData);
        setCast(creditsData?.cast?.slice(0,10));
        setDirectors(creditsData?.crew
          ?.filter((item) => item?.job === 'Director')
          ?.map((item) => item?.name)
        );

        const video = videosData?.results?.find((video) => video?.type === 'Trailer');
        setVideo(video);

        const videos = videosData?.results?.filter((video) => video?.type != 'Trailer').slice(0, 10);
        setVideos(videos);

        setData(recomendationsData?.results?.slice(0, 10));

        setKeywords(keywordsData?.keywords?.map((item) => item.name));

      } catch (error){
        console.log(error, 'error')
      } finally {
        setLoading(false)
      }

    };
    fetchData();

  }, [type, id]);

  if (loading) {
    return (
      <Flex justify={'center'}>
        <Spinner size={'xl'} color="red" />
      </Flex>
    )
  }

  const title = details?.title || details?.name;
  const releaseDate = type === 'tv' ? details.first_air_date : details.release_date;

  return ( 
  <Box>
    <Box 
      background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)),  url(${imagePathOriginal}/${details?.backdrop_path})`} 
      backgroundRepeat={'no-repeat'} 
      backgroundSize={'cover'} 
      backgroundPosition={'center'} 
      w={'100%'} 
      h={{base: 'auto', md: '500px'}} 
      py={'2'} 
      zIndex={'-1'} 
      display={'flex'} 
      alignItems={'center'}
    >
      <Container maxW={'container.xl'}>
        <Flex alignItems={'center'} gap="10" flexDirection={{base: 'column', md: 'row'}}>
          <Image 
            height={'450px'} 
            borderRadius={'sm'} 
            src={`${imagePath}/${details?.poster_path}`} 
           />
          <Box>
            <Heading fontSize={'3xl'}>
                {title}{" "}
                <Text as="span" fontWeight={'normal'} color={'gray.400'}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
            </Heading>
            <Flex alignItems={'center'} gap={'4'} mt={1} mb={5}>
              <Flex alignItems={'center'}>
                <CalendarIcon mr={2} color={'gray.400'} />
                  <Text fontSize={'sm'}>
                      {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
              </Flex>
              {type === 'movie' && (
                <>
                    <Flex alignItems={'center'}>
                      <TimeIcon mr='2' color={'gray.400'} />
                      <Text fontSize={'sm'}>{fromMinutesToHours(details?.runtime)}</Text>
                    </Flex>
                </>
              )}
            </Flex>
            <Flex alignItems={'center'} gap={'4'}>
              <CircularProgress 
                  value={ratingToPercentage(details?.vote_average)} 
                  bg={'gray.800'} 
                  borderRadius={'full'} 
                  p={'0.5'} 
                  size={'70px'} 
                  color={resolveRatingColor(details?.vote_average)} 
                  thickness={'6px'}
                >
                <CircularProgressLabel fontSize={'lg'}>
                  {ratingToPercentage(details?.vote_average)}{" "}
                  <Box as="span" fontSize={'10px'}>
                      %
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>
              <Text display={{base: 'none', md: 'initial'}}>
                  User Score
              </Text>
              <Button display={'none'} leftIcon={<CheckCircleIcon />} colorScheme="green" variant={'outline'} onClick={() => console.log("click")}>
                  In WatchedList
                </Button>
              <Button leftIcon={<SmallAddIcon />} variant={'outline'} onClick={() => console.log("click")}>
                  Add to watchedlist
                </Button>
            </Flex>
            <Text color={'gray.400'} fontSize={'sm'} fontStyle={'italic'} my="5">
                {details?.tagline}
            </Text>
            <Heading fontSize={'xl'} mb={'3'}>Overview</Heading>
            <Text fontSize={'md'} mb={'3'}>{details?.overview}</Text>
            <Flex mt='6' gap="2">
                {details?.genres?.map((genre) => 
                  ( <Badge key={genre?.id}>{genre?.name}</Badge> )
                )}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
    <Container maxW={'container.xl'} pb="10">
      <Heading as="h2" fontSize={'md'} textTransform={'uppercase'} mt="10">
          Cast
        </Heading>
      <Flex mt="5" mb="10" overflowX={'scroll'} gap={'5'}>
        {cast?.lenght === 0 && <Text>No cast found</Text> }
        {cast && cast?.map((item) => ( <CastComponent key={item.id} item={item} />))}
      </Flex>
      <Heading as="h2" fontSize={'md'} textTransform={'uppercase'} mt="10" mb="10">
          Videos
      </Heading>
      <VideoComponent id={video?.key} />
      <Flex mt="5" mb='10' overflowX={'scroll'} gap={'5'}>
        {videos && videos?.map((item) => ( 
          <Box key={item?.key} maxW={'290px'} minW={'290px'}>
            <VideoComponent id={item?.key} small/>
            <Text fontSize={'sm'} fontWeight={'bold'} mt='2' noOfLines={2}>
                {item?.name}{" "}
            </Text>
          </Box>))}
      </Flex>
      <Heading as="h2" fontSize={'md'} textTransform={'uppercase'} mt="10" mb="7">
          Recommendations 
      </Heading>

      { type === 'tv' && (<GridComponent data={data} isLoading={loading}/>)}
      { type === 'movie' && 
          (
          <RecommendationComponent 
              watchedMovies={watchedMovies} 
              directors={directors} 
              keywords={keywords}
              details={details}
              isLoading={loading}

          />
      )}

    </Container>
  </Box>

  
  )
}

export default DetailsPage;
