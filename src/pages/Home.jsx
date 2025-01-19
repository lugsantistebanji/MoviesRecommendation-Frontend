import { Container, Heading } from '@chakra-ui/react'

const Home = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTranform={"uppercase"}>
        Trending
      </Heading>
    </Container>
  )
}

export default Home
