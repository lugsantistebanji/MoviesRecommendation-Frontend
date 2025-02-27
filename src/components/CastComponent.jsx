import { Box, Image, Flex, Text } from '@chakra-ui/react';
import { imagePath } from '../services/api/tmdb.js';

const CastComponent = ({item}) => {
  return (
      <Box 
        position={'relative'}
        transform={'scale(1)'}
        _hover={{
          transition: 'transform 0.2s ease-¡n-out',
          "& .overlay":{
            opacity: 1,
          }
        }}
        minW={'150px'}

      >
        <Image 
          src={`${imagePath}/${item?.profile_path}`}
          alt={item.name}
          height={'225px'}
          w={'100%'}
          objectFit={'cover'}
          borderRadius={'sm'}
        />
        <Box
          className="overlay" 
          pos={"absolute"} 
          p="0px" 
          bottom={"0"} 
          left={"0"} 
          w={"100%"} 
          h={"10%"} 
          bg="rgba(0,0,0,0.9)" 
          opacity={"0"} 
          transition={"opacity 0.3 ease-in-out"}
        >
          <Text textAlign={"center"} fontSize={'xs'} noOfLines={1}>{item?.name}</Text>
        </Box>
      </Box>
  )
}

export default CastComponent
