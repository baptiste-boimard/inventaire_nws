import { useAppDispatch, useAppSelector } from '../../../hooks';
import { BaseSyntheticEvent } from 'react';

// == IMPORT CHAKRA UI ==
import {
  Box,
  Input, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  Button,
} from '@chakra-ui/react';

// == IMPORT ACTION ==
import { handleFieldChange } from '../../../slices/utilitiesSlice';
import { DataStudy, postStudy } from '../../../slices/studySlice';

function PostStudy () {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { postInventoryName, postInventoryQuantity, postInventoryDetails} = useAppSelector(state => state.utilitiesReducer);

  // == ACTION ==
  /** Gestion des chanmps controlés */
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault(); 
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };    
    dispatch(handleFieldChange(changePayload));
  };
  /** Envoi le nouveau matériel au back */
  const handleSubmit = (e: React.FormEvent) => {
    const postInventoryData: Omit<DataInventory, 'created_at' | 'inventory_id'> = {
      name: postInventoryName,
      quantity: postInventoryQuantity!,
      details: postInventoryDetails,
    };
    console.log(typeof postInventoryName, typeof postInventoryDetails, typeof postInventoryQuantity);
    
    dispatch(postInventory(postInventoryData));    
  };

  return (
    <Box
      border={'1px solid'}
      borderColor={'gray'}
      borderRadius={'30px'}
    >
      <Box bg='white' w='100%' p={4} color='black'fontWeight={'bold'} textAlign={'center'}>
        Ajouter un nouveau matériel
      </Box>
      <Box bg='white' w='100%' p={0} color='white'>
        <TableContainer>
          <Table 
            variant='striped'
            colorScheme='gray'
            size={'lg'}
            fontSize={13}
          >
            <Thead>
              <Tr color={'black'}>
                <Th p={2} width={'30%'} align={'left'}>Nom</Th>
                <Th p={2} width={'10%'} textAlign={'center'}>Quantité</Th>
                <Th p={2} pl={8} width={'40%'} align={'left'}>Détails</Th>
                <Th p={1} width={'20%'} textAlign={'center'}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr color={'black'} fontSize={13} borderRadius={'30px'}>
                <Td p={2} pr={8}
                >
                  <FormControl>
                    <Input 
                      fontSize={13}
                      pl={2}
                      
                      type='text'
                      border={'1px'}
                      borderColor={'gray'}
                      name='postInventoryName'
                      value={postInventoryName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Td>
                <Td p={0}>
                  <FormControl>
                    <Input
                    pl={9}
                      fontSize={13}
                      type='number'
                      border={'1px'}
                      borderColor={'gray'}
                      name='postInventoryQuantity'
                      value={postInventoryQuantity}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Td>
                <Td p={2} pl={8}>
                  <FormControl>
                    <Input
                      alignItems={'center'}
                      fontSize={13}
                      type='text'
                      border={'1px'}
                      borderColor={'gray'}
                      name='postInventoryDetails'
                      value={postInventoryDetails}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Td>
                <Td p={1.5}>
                  <FormControl>
                    <Button
                      colorScheme='blue'
                      onClick={handleSubmit}
                      size={'sm'}
                    >
                      Ajouter à l'inventaire
                    </Button>
                  </FormControl>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default PostStudy;