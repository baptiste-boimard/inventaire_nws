// IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';

function Accueil () {
  return(
  <Box
    bg='white'
    w='100%'
    maxH='100%'
    p={4}
    color={'black'}
    textAlign={'center'}
  >
    <h1>444Bienvenue dans l'inventaire de la NWS</h1>
    <p>Choisissez la rubrique qui vous intérense</p>
  </Box>
  );
}

export default Accueil;