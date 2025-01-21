import { Container, Heading } from '@chakra-ui/react';
import DiscoversComponent from '../../components/DiscoversComponent.jsx';

const Movies = () => {
  const type = 'movie';

  return (
    <Container maxW={"container.xl"}>
      <DiscoversComponent title={'Movies'} type={type}/>
    </Container>
  )
}

export default Movies
