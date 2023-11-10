import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BaseSyntheticEvent, useEffect } from "react";

// == IMPORT CHAKRA UI ==
import { 
  Button,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
} from '@chakra-ui/react'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

// == IMPORT ACTION AND TYPE ==
import { 
  DataLoan,
  Relaunch,
  deleteLoan,
  studyRelaunch,
  updateLoan,
} from "../../../slices/loanSlice";

import { 
  handleFieldChangeInEditingLoan, 
  addLoanForModalEditing, 
  openModalEditLoan,
  closeModalEditLoan,
  openModalDeleteLoan,
  closeModalDeleteLoan,
} from "../../../slices/utilitiesSlice";

function GetLoanInProgress (
  {
    loan_id,
    inventory_id,
    study_id,
    quantity,
    loaning_date,
    due_date,
    firstname,
    name,
    lastname,
    loan_quantity,
    email,
  }: DataLoan
) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const {  editingLoan } = useAppSelector(state => state.utilitiesReducer);
  
  const inventoryValue: any = editingLoan[`inventory_name-${loan_id}` as any];
  const studyValue: any = editingLoan[`study_name-${loan_id}` as any];
  const quantityValue: any = editingLoan[`quantityLoan-${loan_id}` as any];
  const loaningDateValue: any = editingLoan[`loaning_date-${loan_id}` as any];
  const dueDateValue: any = editingLoan[`due_date-${loan_id}` as string];
  const isOpenDelete: any = editingLoan[`isOpenModalLoanDelete-${loan_id}` as any];

  // == ACTION ==
  /** Ouverture de la modal delete */
  const handleOpenModalDelete = () => {    
    dispatch(openModalDeleteLoan(`isOpenModalLoanDelete-${loan_id}`));    
  };
  /** Fermeture de la modal delete */
  const handleCloseModalDelete = () => {
    dispatch(closeModalDeleteLoan(`isOpenModalLoanDelete-${loan_id}`));    
  };
  /** Gestion des chanmps controlés */
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault(); 
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };    
    dispatch(handleFieldChangeInEditingLoan(changePayload));    
  };
  /** Demande au back la suppression d'un loan */
  const handleDeleteInventory = () => {
    dispatch(deleteLoan(loan_id!));
    handleCloseModalDelete();
  };
  /** Envoi un mail de relance à létudiant du prêt */
  const handleRelaunch = () => {

    const relaunch: Relaunch = {
      name: name!,
      loan_quantity: loan_quantity!,
      loaning_date: loaning_date!,
      due_date: due_date!,
      email: email!,
    }
    dispatch(studyRelaunch(relaunch));
  };
  /** Création dans le slice utilities des variable permettant l'edition dynamique */
  useEffect(() => {
    console.log(quantity);
    
    const createEditingLoan:any = {
      [`isOpenModalLoanDelete-${loan_id}`]: false,
      [`inventory_name-${loan_id}`]: name,
      [`study_name-${loan_id}`]: `${firstname}   ${lastname}`,
      [`quantityLoan-${loan_id}`]: loan_quantity,
      [`loaning_date-${loan_id}`]: loaning_date,
      [`due_date-${loan_id}`]: due_date,
    }; 
    dispatch(addLoanForModalEditing(createEditingLoan));
  }, [dispatch, due_date, firstname, inventory_id, lastname, loan_id, loan_quantity, loaning_date, name, quantity])
  return (
    <>
        {/* ===== MODAL DELETE ===== */}
        <Modal 
          isOpen={isOpenDelete}
          onClose={handleCloseModalDelete}
          size={'2xl'}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={16} py={2.5}>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size={'2xl'}>
                  <Thead>
                    <Tr color={'black'}>
                    <Th width={'40%'} textAlign={'center'}>Matériel</Th>
                      <Th width={'10%'} textAlign={'center'}>Etudiant</Th>
                      <Th width={'50%'} textAlign={'center'}>Quantité</Th>
                      <Th width={'50%'} textAlign={'center'}>Date d'emprunt</Th>
                      <Th width={'50%'} textAlign={'center'}>Date de rendu</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'30%'} pl={4}>{inventoryValue}</Td>
                      <Td width={'30%'} pl={4}>{studyValue}</Td>
                      <Td width={'10%'} textAlign={'center'}>{quantityValue}</Td>
                      <Td width={'40%'} align='left' pl={4}>{loaningDateValue}</Td>
                      <Td width={'40%'} align='left' pl={4}>{dueDateValue}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter py={2} pt={0}>
              <Button
                colorScheme='pink'
                mr={3}
                onClick={handleCloseModalDelete}
                size={'sm'}
              >
                Annuler
              </Button>
              <Button
              colorScheme="green"
              onClick={handleDeleteInventory}
              size={'sm'}
            >
              Confirmer
            </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ===== MODAL DELETE ===== */}

        {/* ===== TABLE ITEM ===== */}
        <Tr color={'black'}>
          <Td p={2} width={'20%'}>{inventoryValue}</Td>
          <Td p={2} width={'20%'}>{studyValue}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>{quantityValue}</Td>
          <Td p={2} width={'15%'} textAlign={'center'}>{loaningDateValue}</Td>
          <Td p={2} width={'15%'} textAlign={'center'}>{dueDateValue}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>
            <IconButton
              onClick={handleRelaunch}
              colorScheme='green'
              aria-label='Editer'
              icon={<EditIcon />}
              size={'xs'}
              />
          </Td>
          <Td p={2} width={'10%'} textAlign='center'>
            <IconButton
              onClick={handleOpenModalDelete}
              colorScheme='pink'
              aria-label='Supprimer'
              icon={<DeleteIcon />}
              size={'xs'}
              />
          </Td>
        </Tr>
        {/* ===== TABLE ITEM ===== */}

    </>
    );
}

export default GetLoanInProgress;