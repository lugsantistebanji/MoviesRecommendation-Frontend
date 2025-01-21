import { Box, Container, Flex} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { getColor } from '../utils/helpers.js'

function Navbar() {
  const location = useLocation();
  const { hash, pathname, search } = location;
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box 
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              CinemaCreuse
            </Box>
          </Link>
          <Flex gap="4" alignItems={"center"}>
            <Link to="/" style={{color: getColor('/', pathname, 'red')}}>Home</Link>
            <Link to="/movies" style={{color: getColor('/movies', pathname, 'red')}}>Movies</Link>
            <Link to="/shows" style={{color: getColor('/shows', pathname, 'red')}}>Shows</Link>
            <Link to="/search" style={{color: getColor('/search', pathname, 'red')}}>Search</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;
