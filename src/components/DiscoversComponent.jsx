import { useState, useEffect } from 'react';
import { fetchDiscovers } from '../services/api/tmdb.js';
import GridComponent from './GridComponent.jsx';
import PropTypes from 'prop-types';
import PaginationComponent from './PaginationComponent.jsx';
import { Select, Flex, Heading } from '@chakra-ui/react';

const DiscoversComponent = ({title, type}) => {
  const [discovers, setdiscovers] = useState([]);
  const [activePage, setactivePage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [sortBy, setsortBy] = useState('popularity.desc&vote_count.gte=1000');
  
  useEffect(() => {
    setisLoading(true);
    fetchDiscovers(type, activePage, sortBy).then((res) => { 
      setdiscovers(res?.results);
      setactivePage(res?.page);
      settotalPages(res?.total_pages);
    }).catch((err) => console.log(err, 'err'))
    .finally(() => setisLoading(false));

  }, [type, activePage, sortBy])
  
  return (
    <>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          {title}
        </Heading>
        <Select w="30" onChange={(e) => {
          setsortBy(e.target.value);
          setactivePage(1);
        }}>
          <option value="popularity.desc&vote_count.gte=1000">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
        </Select>
      </Flex>
      <GridComponent data={discovers} isLoading={isLoading} type={type}/>
      <PaginationComponent activePage={activePage} totalPages={totalPages} setPage={setactivePage} />
    </>
  )
};

DiscoversComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default DiscoversComponent
