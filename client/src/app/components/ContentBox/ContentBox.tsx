import { Routes, Route } from 'react-router-dom';

// == IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

// == IMPORT IMAGE ==
import nws_logo from '../../docs/nws_logo.png';

// == IMPORT COMPONENTS ==
import Inventory from '../Inventory/inventory';
import Study from '../Study/study';


function ContentBox () {
  return (
    <Box bg='white' w='100%' p={4} pt={0} color='white' overflow={'visible'}>
      <Box bg='white' w='100%' p={0} color='white' display='flex' justifyContent='center' mb={'45px'}>
        <Image src={nws_logo} alt='NWS' boxSize='100px'/>
      </Box>
      <Routes>
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/study' element={<Study />} />
      </Routes>
    </Box>
  );
}

export default ContentBox;