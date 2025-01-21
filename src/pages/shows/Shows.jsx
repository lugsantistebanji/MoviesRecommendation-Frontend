import { Container, Heading } from '@chakra-ui/react';
import DiscoversComponent from '../../components/DiscoversComponent.jsx';

const Shows = () => {
  const type = 'tv';

  return (
    <Container maxW={"container.xl"}>
      <DiscoversComponent title={'Shows'} type={type}/>
    </Container>
  )
}

export default Shows
