import { Button, Flex, Text } from '@chakra-ui/react'; 
import PropTypes from 'prop-types';

const PaginationComponent = ({ activePage, totalPages, setPage }) => {
  return (
    <Flex gap={'2'} alignItems='center'>
      <Flex gap={'2'} maxW={'250'} my="10">
        <Button onClick={() => setPage(activePage - 1)} isDisabled={activePage === 1}>Prev</Button>
        <Button onClick={() => setPage(activePage + 1)} isDisabled={activePage === totalPages}>Next</Button>
      </Flex>
      <Flex gap={'1'}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  )
}

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default PaginationComponent
