import GetInventory from "./GetInventory/getinventory";
import PostInventory from "./PostInventory/postInventory";

// IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';


function Inventory () {
  return(
    <Box
      bg='white'
      w='100%'
      maxH='100%'
      p={4}
    >
      <GetInventory />
      <PostInventory />
    </Box>
  );
}

export default Inventory;