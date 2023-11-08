import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ReactElement, useEffect } from 'react';

// == IMPORT CHAKRA UI ==
import { Box, Center, Flex, Text} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, TableContainer} from '@chakra-ui/react'

// == IMPORT COMPONENTS ==
import GetInventoryItems from '../GetInventoryItems/getIinventoryItems';

// == IMPORT ACTION ==
import { getInventory } from '../../../slices/inventorySlice';


function GetInventory () {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  
  // == CALL STORE ==
  const { dataInventory } = useAppSelector(state => state.inventoryReducer);

  return (
    <Flex 
      color='black'
      direction={'column'}
      mb={12} border='1px solid'
      borderColor='gray'
      borderRadius="30px"
    >
      <Center bg='white'>
        <Text fontWeight={'bold'}>Liste du matériel</Text>
      </Center>
      {/* <Square bg='blue.200'>
        <Text>Box 2</Text>
      </Square> */}
      <Box bg='white'>
        <TableContainer>
          <Table
            variant='striped'
            colorScheme='gray'
            size={'lg'}
            fontSize={13}
          >
            <Thead>
              <Tr color={'black'}>
                <Th p={2} width={'30%'}>Nom</Th>
                <Th p={2} width={'10%'}>Quantité</Th>
                <Th p={2} pl={8} width={'40%'}>Détails</Th>
                <Th p={2} width={'10%'}>Editer</Th>
                <Th p={2} width={'10%'}>Supprimer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataInventory.map((inventoryItem) => <GetInventoryItems key={inventoryItem.inventory_id} {...inventoryItem} />) as any}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default GetInventory;