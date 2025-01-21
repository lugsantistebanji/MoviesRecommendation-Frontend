import { Container, Heading, Grid, Flex, Box, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTrending } from '../services/api/tmdb.js'
import GridComponent from '../components/GridComponent.jsx'

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [isLoading , setIsLoading ] = useState(false);
 
  useEffect(() => {
    setIsLoading(true);
    fetchTrending(timeWindow, 'en-US').then((res) => {
        setData(res);
      }).catch((err) => {
        console.log(err, 'err');
      }).finally(() => {
        setIsLoading(false);
      });
  }, [timeWindow]);
  
  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
          Trending
        </Heading>
        <Flex 
          alignItems={'center'} 
          gap={'2'} 
          border={'1px solid teal'} 
          borderRadius={'20px'}
        >
          <Box as="button" px="4" py="1" borderRadius={'20px'} onClick={() => setTimeWindow('day')} bg={`${timeWindow === 'day' ? 'gray.700': ''}`}>
            Today
          </Box>
          <Box as="button" px="4" py="1" borderRadius={'20px'} onClick={() => setTimeWindow('week')} bg={`${timeWindow === 'week' ? 'gray.700': ''}`}>
            This Week
          </Box>

        </Flex>
      </Flex>
      <GridComponent data={data} isLoading={isLoading} />
    </Container>
  )
}

export default Home
