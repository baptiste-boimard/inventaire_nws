import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
// == IMPORT CHAKRA UI ==
import { Box, Center, Flex, Spacer, Square, Text} from '@chakra-ui/react'
import InventoryItems from './InventoryItems/inventoryItems';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

// == IMPORT ACTION ==
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
      <Box bg='white'>
        <TableContainer>
          <Table variant='striped' colorScheme='gray' size={'lg'}>
            <Thead>
              <Tr color={'black'}>
                <Th width={'30%'}>Nom</Th>
                <Th width={'10%'}>Quantité</Th>
                <Th width={'40%'}>Détails</Th>
                <Th width={'10%'}>Editer</Th>
                <Th width={'10%'}>Supprimer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataInventory.map((inventoryItem) => <InventoryItems key={inventoryItem.inventory_id} {...inventoryItem} />)}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default Inventory;