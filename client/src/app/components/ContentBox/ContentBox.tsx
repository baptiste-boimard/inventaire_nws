// == IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

// == IMPORT IMAGE ==
import nws_logo from '../../docs/nws_logo.png';

// == IMPORT COMPONENTS ==
import Inventory from '../Inventory/inventory';
import PostInventory from '../PostInventory/PostInventory';


function ContentBox () {
  return (
    <Box bg='white' w='100%' p={4} pt={0} color='white' overflow={'visible'}>
      <Box bg='white' w='100%' p={0} color='white' display='flex' justifyContent='center'>
        <Image src={nws_logo} alt='NWS' boxSize='100px'/>
      </Box>
      {/* <Box bg='green' w='100%' p={4} color='white'>
        This is the Box
      </Box> */}
      <Box 
        bg='white'
        w='100%'
        maxH='100%'
        p={4}
      >
        <Inventory />
        <PostInventory />
      </Box>
    </Box>
  );
}

export default ContentBox;