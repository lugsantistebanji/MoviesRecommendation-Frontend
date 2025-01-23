import { useState, useEffect } from 'react';
import { Flex, Container, Heading, Box, Input, Spinner } from '@chakra-ui/react';
import PaginationComponent from '../../components/PaginationComponent.jsx';
import { searchData } from '../../services/api/tmdb.js';
import GridComponent from '../../components/GridComponent.jsx';


const Search = () => {
  
  const [activePage, setactivePage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tempSearchValue, settempSearchValue] = useState('')
  const [data, setdata] = useState([]);


  useEffect(() => {
    setisLoading(true);
    searchData(searchValue, activePage).then((res) => { 
      setdata(res?.results?.filter(
        (item) => ['movie', 'tv'].includes(item?.media_type) && item?.poster_path
      ));
      setactivePage(res?.page);
      settotalPages(res?.total_pages);
    }).catch((err) => console.log(err, 'err'))
    .finally(() => setisLoading(false));

  }, [searchValue, activePage]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };

  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Search
        </Heading>
      </Flex>
      <Box alignItems={'center'} mb={'7'}>
        <form onSubmit={handleSearch}>
          <Input 
            placeholder="Search movies, tv shows"
            _placeholder={{color: 'gray.100'}} 
            value={tempSearchValue} 
            onChange={(e) => settempSearchValue(e.target.value)}
          />
        </form>
      </Box>
      
      {isLoading && (
        <Flex justifyContent={'center'} mt={'10'}>
          <Spinner size={'xl'} color="red" />
        </Flex>
      )}
      
      {!isLoading && data?.length === 0 && (
         <Heading textAlign={'center'} as='h3' fontSize={'sm'} mt={'10'}>
          No results found 
        </Heading>
      )}
      <GridComponent data={data} isLoading={isLoading}/>

      {!isLoading && data?.length > 0 && totalPages > 1 && (
        <PaginationComponent activePage={activePage} totalPages={totalPages} setPage={setactivePage} />
      )}
    </Container>
  )
}

export default Search;
