// IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';

function NotFound () {
  return(
  <Box
    bg='white'
    w='100%'
    maxH='100%'
    p={4}
    color={'black'}
    textAlign={'center'}
  >
    <h1>Erreur 404</h1>
    <p>La page que vous recherchée n'existe pas</p>
  </Box>
  );
}

export default NotFound;