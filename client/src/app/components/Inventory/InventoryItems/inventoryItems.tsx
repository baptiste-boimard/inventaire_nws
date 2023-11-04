// == IMPORT CHAKRA UI ==
import { Box } from "@chakra-ui/react";
import { Container } from '@chakra-ui/react'

// == IMPORT TYPE ==
import { DataInventory } from "../../../slices/inventorySlice";



function InventoryItems ({inventory_id, name, quantity, details, created_at}: DataInventory ) {
  return (
    <Box>
      <Container bg={'black'}>
        {inventory_id} {name} {quantity} {details} {created_at}
      </Container>
    </Box>
  );
}

export default InventoryItems;