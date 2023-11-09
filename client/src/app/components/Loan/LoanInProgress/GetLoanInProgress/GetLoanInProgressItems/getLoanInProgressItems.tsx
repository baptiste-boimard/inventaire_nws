import { useAppDispatch, useAppSelector } from "../../../../../hooks";
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

// == IMPORT TYPE ==
import { DataLoan, deleteLoan, updateLoan,  } from "../../../../../slices/loanSlice";

// == IMPORT ACTION ==
import { 
  handleFieldChangeInEditingLoan, 
  addLoanForModalEditing, 
  openModalEditLoan,
  closeModalEditLoan,
  openModalDeleteLoan,
  closeModalDeleteLoan,
} from "../../../../../slices/utilitiesSlice";

function GetLoanInProgress ({loan_id, inventory_id, study_id, quantity, loaning_date, due_date, enclose}: DataLoan) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { dataLoan } = useAppSelector(state => state.loanReducer);
  const {  editingLoan } = useAppSelector(state => state.utilitiesReducer);
  
  const inventoryIdValue: any = editingLoan[`inventory_id-${loan_id}` as any];
  const studyIdValue: any = editingLoan[`study_id-${loan_id}` as any];
  const quantityValue: any = editingLoan[`quantityLoan-${loan_id}` as any];
  const loaningDateValue: any = editingLoan[`loaningDate-${loan_id}` as any];
  const dueDateValue: any = editingLoan[`dueDate-${loan_id}` as any];
  const isOpenEdit: any = editingLoan[`isOpenModalLoanEdit-${loan_id}` as any];
  const isOpenDelete: any = editingLoan[`isOpenModalLoanDelete-${loan_id}` as any];

  // == ACTION ==
  /** Ouverture de la modal Edit */
  const handleOpenModalEdit = () => {
    dispatch(openModalEditLoan(`isOpenModalLoanEdit-${loan_id}`));    
  };
  /** Fermeture de la modal Edit */
  const handleCloseModalEdit = () => {
    dispatch(closeModalEditLoan(`isOpenModalLoanEdit-${loan_id}`));
  };
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
  /** Soumission du formulaire au back pour la modification d'un loan */
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const loan: DataLoan = {
      loan_id: loan_id,
      inventory_id: inventoryIdValue!,
      study_id: studyIdValue,
      quantity: quantityValue,
      loaning_date: loaningDateValue,
      due_date: dueDateValue,
    };
    dispatch(updateLoan(loan));
    handleCloseModalEdit();
  };
  /** Demande au back la suppression d'un inventory */
  const handleDeleteInventory = () => {
    dispatch(deleteLoan(loan_id!));
    handleCloseModalDelete();
  }
  /** Création dans le slice utilities des variable permettant l'eidtion dynamique */
  useEffect(() => {
    const createEditingLoan:any = {
      [`isOpenModalLoanEdit-${loan_id}`]: false,
      [`isOpenModalLoanDelete-${loan_id}`]: false,
      [`inventory_id-${loan_id}`]: inventory_id,
      [`study_id-${loan_id}`]: study_id,
      [`quantityLoan-${loan_id}`]: quantity,
      [`loaning_date-${loan_id}`]: loaning_date,
      [`due_date-${loan_id}`]: due_date,
    };
    dispatch(addLoanForModalEditing(createEditingLoan));
  }, [dispatch, due_date, inventory_id, loan_id, loaning_date, quantity, study_id])
  return (
    <>
      {/* ===== MODAL EDIT ===== */}
      <Modal
        isOpen={isOpenEdit}
        onClose={handleCloseModalEdit}
        size={'2xl'}
        isCentered
      >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={16} py={2.5}>Edition du prêt</ModalHeader>
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
                      <Td width={'40%'} ml={'2px'}>
                        <FormControl>
                          <Input type='text'
                            value={inventoryIdValue}
                            onChange={handleChange}
                            name={`inventory_id-${loan_id}`}
                            fontSize={14}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'40%'} ml={'2px'}>
                        <FormControl>
                          <Input type='text'
                            value={studyIdValue}
                            onChange={handleChange}
                            name={`study_id-${loan_id}`}
                            fontSize={14}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'10%'} textAlign={'center'}>
                        <FormControl>
                          <Input type='number'
                            value={quantityValue}
                            onChange={handleChange}
                            name={`quantityLoan-${loan_id}`}
                            fontSize={14}

                          />
                        </FormControl>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <FormControl>
                          <Input type='date'
                            value={loaningDateValue}
                            onChange={handleChange}
                            name={`loaning_date-${loan_id}`}
                            fontSize={14}

                          />
                        </FormControl>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <FormControl>
                          <Input type='date'
                            value={dueDateValue}
                            onChange={handleChange}
                            name={`due_date-${loan_id}`}
                            fontSize={14}

                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter py={2} pt={0}>
              <Button 
                colorScheme='pink'
                mr={3}
                onClick={handleCloseModalEdit}
                size={'sm'}
              >
                Annuler
              </Button>
              <Button
                colorScheme="green"
                onClick={handleSubmit}
                size={'sm'}
              >
                Confirmer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ===== MODAL EDIT ===== */}


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
                      <Td width={'30%'} pl={4}>{inventoryIdValue}</Td>
                      <Td width={'30%'} pl={4}>{studyIdValue}</Td>
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
          <Td p={2} pl={4} width={'30%'}>{inventoryIdValue}</Td>
          <Td p={2} pl={4} width={'30%'}>{studyIdValue}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>{quantityValue}</Td>
          <Td p={2} pl={8} width={'40%'} align='left'>{loaningDateValue}</Td>
          <Td p={2} pl={8} width={'40%'} align='left'>{dueDateValue}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>
            <IconButton
              onClick={handleOpenModalEdit}
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