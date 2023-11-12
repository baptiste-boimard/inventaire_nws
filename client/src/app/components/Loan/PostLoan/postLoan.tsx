import { BaseSyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
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
  Select,
  Alert,
  AlertTitle,
  AlertDescription,
  IconButton,
} from '@chakra-ui/react';

import { CloseIcon } from '@chakra-ui/icons'


// == IMPORT TYPE AND ACTION ==
import { editPostLoanIdInventory, editPostLoanIdStudy, handleFieldChange, stockAlertSwitch } from '../../../slices/utilitiesSlice';
import { DataLoan, postLoan } from '../../../slices/loanSlice';
import { DataInventory, updateInventory } from '../../../slices/inventorySlice';

function PostLoan () {
  const dispatch = useAppDispatch();

  
  // CALL STORE //
  const { dataInventory } = useAppSelector(state => state.inventoryReducer);
  const { dataStudy } = useAppSelector(state => state.studyReducer);
  const { postLoanQuantity, postLoanIdInventory, postLoanidStudy, stockAlert } = useAppSelector(state => state.utilitiesReducer);


  // == ACTION ==
  /** Permet le changements des champs controlés */
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch(handleFieldChange(changePayload));
  };
  /** Sélectionne les propriétés du matériel séléctionné */
  const handleChangeInventorySelect = (e: BaseSyntheticEvent) => { 
    const id = e.target.options[e.target.selectedIndex].id;    
    dispatch(editPostLoanIdInventory(id));
  };
  /** Sélectionne les propriétés de l'étudiant séléctionné */
  const handleChangeStudySelect = (e: BaseSyntheticEvent) => { 
    const id = e.target.options[e.target.selectedIndex].id;
    dispatch(editPostLoanIdStudy(id));
  };
  /** Ferme la fenetre d'alerte stock 0 */
  const handleCloseStockAlert = () => {
    dispatch(stockAlertSwitch());
  }
  /** Soumet un nouveau pret */
  const handleSubmit = (e : BaseSyntheticEvent) => {
    e.preventDefault();
    // let select = document.querySelector('.selectInventory') as any;
    // let option = select[0].getElementsByTagName('option') as any;
    // select.setvalue('coucou')
    // select!.value = "coucou";
    // console.log('select', select);
    
    const objectInventory = dataInventory.find(obj => obj.inventory_id === postLoanIdInventory);
    const objectStudy = dataStudy.find(obj => obj.study_id === postLoanidStudy);
    
    if(objectInventory!.quantity <= 0) {
      dispatch(stockAlertSwitch());
    } else {
      const postLoanData: DataLoan = {
        inventory_id: postLoanIdInventory!,
        study_id: postLoanidStudy!,
        loan_quantity: parseInt(`${postLoanQuantity}`, 10),
        name: objectInventory!.name,
        email: objectStudy!.email,
      };
      const updateInventoryData: Partial<DataInventory>= {
        inventory_id: postLoanIdInventory!,
        name: objectInventory!.name,
        quantity: (objectInventory!.quantity - parseInt(`${postLoanQuantity}`, 10)) as number,
        details: objectInventory!.details,
      };    
      dispatch(postLoan(postLoanData));
      dispatch(updateInventory(updateInventoryData));
    }
  };

  return (
    <Box
      border={'1px solid'}
      borderColor={'gray'}
      borderRadius={'30px'}
    >
      <Box bg='white' w='100%' p={4} color='black'fontWeight={'bold'} textAlign={'center'}>
        Créer un emprunt
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
                <Th p={2} width={'35%'} align={'left'}>Matériel</Th>
                <Th p={2} width={'35%'} textAlign={'left'}>Etudiant</Th>
                <Th p={2} width={'10%'} align={'left'}>Quantité</Th>
                <Th p={1} width={'20%'} textAlign={'center'}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr color={'black'} fontSize={13} borderRadius={'30px'}>
                <Td p={2}>
                <FormControl>
                    <Select 
                      className='selectInventory'
                      onChange={handleChangeInventorySelect}
                      // defaultValue='Séléctionnez'
                      placeholder='Séléctionnez'
                    >
                      {dataInventory.map((inventoryItem)=> 
                        <option key={inventoryItem.inventory_id} id={`${inventoryItem.inventory_id}`} >
                          {`${inventoryItem.name}  (${inventoryItem.quantity})`}
                        </option>)}
                    </Select>
                  </FormControl>
                </Td>
                <Td p={2}>
                  <FormControl>
                    <Select
                      onChange={handleChangeStudySelect}
                      placeholder='Séléctionnez'
                    >
                      {dataStudy.map((studyItem =>
                      <option key={studyItem.study_id} id={`${studyItem.study_id}`}>
                        {`${studyItem.firstname}  ${studyItem.lastname}`}
                      </option>))}
                    </Select>
                  </FormControl>
                </Td>
                <Td p={2}>
                  <FormControl>
                  <Input
                      alignItems={'center'}
                      fontSize={13}
                      type='number'
                      border={'1px'}
                      borderColor={'gray'}
                      name='postLoanQuantity'
                      value={postLoanQuantity}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Td>
                <Td p={1.5}>
                  <FormControl ml={5}>
                    <Button
                      colorScheme='blue'
                      onClick={handleSubmit}
                      size={'sm'}
                    >
                      Créer le prêt
                    </Button>
                  </FormControl>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        {stockAlert &&(
          <Alert status='error' color={'gray'}>
            <IconButton
              bg={'red'}
              mr={5}
              size={'xs'}
              colorScheme='blue'
              aria-label='Search database'
              icon={<CloseIcon />}
              onClick={handleCloseStockAlert}
            />
            {/* <AlertIcon /> */}
            <AlertTitle>Création du prêt impossible</AlertTitle>
            <AlertDescription>Le stock du matériel est à zéro</AlertDescription>
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default PostLoan;