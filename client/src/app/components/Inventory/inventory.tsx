import { Box, Center, Flex, Spacer, Square, Text} from '@chakra-ui/react'
import InventoryItems from './InventoryItems/inventoryItems';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getInventory } from '../../slices/inventorySlice';



function Inventory () {
  const dispatch = useAppDispatch();
  
  
  useEffect(() => {
    dispatch(getInventory());
  }, []);
  
  // == CALL STORE ==
  const { dataInventory } = useAppSelector(state => state.inventoryReducer);

  return (
    <Flex color='white' direction={'column'}>
      <Center bg='green.500'>
        <Text>Liste du matériel</Text>
      </Center>
      <Square bg='blue.500'>
        <Text>Box 2</Text>
      </Square>
      <Box bg='tomato'>
        {dataInventory.map((inventoryItem) => <InventoryItems key={inventoryItem.inventory_id} {...inventoryItem} />)}
      </Box>
    </Flex>
  );
}

export default Inventory;