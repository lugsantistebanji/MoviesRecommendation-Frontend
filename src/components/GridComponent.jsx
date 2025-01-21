import CardComponent from './CardComponent.jsx';
import {Grid, Skeleton} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridComponent = ({data, isLoading, type='movie'}) => {
  return (
      <Grid templateColumns={{
        base: "1fr",
        sm: 'repeat(2,1fr)',
        md:'repeat(4,1fr)',
        lg: 'repeat(5,1fr)',
        }}
        gap={'4'}
        mb={'5'}
      >
        {
          data && data?.map((item, i) => (
            isLoading ? (
            <Skeleton key={i} height="300"/>
            ) : (
                <CardComponent key={item?.id} item={item} type={item?.media_type? item?.media_type : type}/>
            )
          ))
        }
      </Grid>
  )
};

GridComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default GridComponent;
