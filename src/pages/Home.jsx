import { Container, Heading, Grid, Flex, Box, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTrending } from '../services/api/tmdb.js'
import CardComponent from '../components/CardComponent.jsx'


const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [loading , setloading ] = useState(true);
 
  useEffect(() => {
    setloading(true);
    fetchTrending(timeWindow, 'en-US').then((res) => {
        setData(res);
      }).catch((err) => {
        console.log(err, 'err');
      }).finally(() => {
        setloading(false);
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

      <Grid templateColumns={{
        base: "1fr",
        sm: 'repeat(2,1fr)',
        md:'repeat(4,1fr)',
        lg: 'repeat(5,1fr)',
        }}
        gap={'4'}
      >
        {
          data && data?.map((item, i) => (
            loading ? (
            <Skeleton key={i} height="300"/>
            ) : (
                <CardComponent key={item?.id} item={item} type={item?.media_type}/>
            )
          ))
        }
      </Grid>
    </Container>
  )
}

export default Home
