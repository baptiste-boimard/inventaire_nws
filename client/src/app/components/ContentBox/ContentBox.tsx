import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import nws_logo from '../../docs/nws_logo.png';
import Inventory from '../Inventory/inventory';


function ContentBox () {
  return (
    <Box bg='tomato' w='100%' p={4} pt={0} color='white' overflow={'visible'}>
      <Box bg='pink' w='100%' p={0} color='white' display='flex' justifyContent='center'>
        <Image src={nws_logo} alt='NWS' boxSize='100px'/>
      </Box>
      <Box bg='green' w='100%' p={4} color='white'>
        This is the Box
      </Box>
      <Box bg='blue' w='100%' h='100%' p={4} color='white' maxHeight='100%'>
        <Inventory />
      </Box>
    </Box>
  );
}

export default ContentBox;