import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';

// == IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

// == IMPORT IMAGE ==
import nws_logo from '../../docs/nws_logo.png';

// == IMPORT COMPONENTS ==
import Inventory from '../Inventory/inventory';
import Study from '../Study/study';
import Loan from '../Loan/loan';
import Accueil from '../Accueil/accueil';
import NotFound from '../NotFound/notFound';

// == IMPORT ACTION ==
import { getStudy } from '../../slices/studySlice';
import { getInventory } from '../../slices/inventorySlice';
import { getLoan } from '../../slices/loanSlice';


function ContentBox () {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudy());
    dispatch(getInventory());
    dispatch(getLoan());
  }, [dispatch])
  return (
    <Box bg='white' w='100%' p={4} pt={0} color='white' overflow={'visible'}>
      <Box bg='white' w='100%' p={0} color='white' display='flex' justifyContent='center' mb={'45px'}>
        <Image src={nws_logo} alt='NWS' boxSize='100px'/>
      </Box>
      <Routes>
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/study' element={<Study />} />
        <Route path='/loan' element={<Loan />} />
        <Route path='/' element={<Accueil />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default ContentBox;