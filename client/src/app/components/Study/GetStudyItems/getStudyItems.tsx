import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BaseSyntheticEvent, useEffect } from "react";

// == IMPORT CHAKRA UI ==
import { Button, IconButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FormControl,  Input } from '@chakra-ui/react'

// == IMPORT TYPE AND ACTION ==
import { DataStudy, deleteStudy, updateStudy } from "../../../slices/studySlice";

// == IMPORT ACTION ==
import { 
  handleFieldChangeInEditingStudy, 
  addStudyForModalEditing, 
  openModalEditStudy,
  closeModalEditStudy,
  openModalDeleteStudy,
  closeModalDeleteStudy,
} from "../../../slices/utilitiesSlice";



function GetStudyItems ({study_id, firstname, lastname, email}: DataStudy ) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { dataStudy } = useAppSelector(state => state.studyReducer);
  const {  editingStudy } = useAppSelector(state => state.utilitiesReducer);
  
  const firstnameValue: any = editingStudy[`firstname-${study_id}` as any];
  const lastnameValue: any = editingStudy[`lastname-${study_id}` as any];
  const emailValue: any = editingStudy[`email-${study_id}` as any];
  const isOpenEditStudy: any = editingStudy[`isOpenEditStudy-${study_id}` as any];
  const isOpenDeleteStudy: any = editingStudy[`isOpenDeleteStudy-${study_id}` as any];

  // == ACTION ==
  /** Ouverture de la modal Edit */
  const handleOpenModalEdit = () => {
    dispatch(openModalEditStudy(`isOpenModalInventoryEdit-${study_id}`));    
  };
  /** Fermeture de la modal Edit */
  const handleCloseModalEdit = () => {
    dispatch(closeModalEditStudy(`isOpenModalInventoryEdit-${study_id}`));
  };
  /** Ouverture de la modal delete */
  const handleOpenModalDelete = () => {    
    dispatch(openModalDeleteStudy(`isOpenModalInventoryDelete-${study_id}`));    
  };
  /** Fermeture de la modal delete */
  const handleCloseModalDelete = () => {
    dispatch(closeModalDeleteStudy(`isOpenModalInventoryDelete-${study_id}`));    
  };
  /** Gestion des chanmps controlés */
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault(); 
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };    
    dispatch(handleFieldChangeInEditingStudy(changePayload));    
  };
  /** Soumission du formulaire au back pour la modification d'un inventory */
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const study: DataStudy = {
      study_id: study_id ,
      firstname: firstnameValue,
      lastname: lastnameValue,
      email: emailValue,
    };
    dispatch(updateStudy(study));
    handleCloseModalEdit();
  };
  /** Demande au back la suppression d'un inventory */
  const handleDeleteInventory = () => {
    dispatch(deleteStudy(study_id!));
    handleCloseModalDelete();
  }
  /** Création dans le slice utilities des variable permettant l'eidtion dynamique */
  useEffect(() => {
    const createEditingStudy:any = {
      [`isOpenEditStudy-${study_id}`]: false,
      [`isOpenDeleteStudy-${study_id}`]: false,
      [`firstname-${study_id}`]: firstname,
      [`lastname-${study_id}`]: lastname,
      [`email-${study_id}`]: email,
    };
    dispatch(addStudyForModalEditing(createEditingStudy));
  }, [dataStudy, dispatch, email, firstname, lastname, study_id])

  return (
    <>
      {/* ===== MODAL EDIT ===== */}
      <Modal
        isOpen={isOpenEditStudy}
        onClose={handleCloseModalEdit}
        size={'2xl'}
        isCentered
      >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={16} py={2.5}>Edition de l'étudiant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size={'2xl'}>
                  <Thead>
                    <Tr color={'black'}>
                      <Th width={'40%'} textAlign={'center'}>Prénom</Th>
                      <Th width={'10%'} textAlign={'center'}>Nom</Th>
                      <Th width={'50%'} textAlign={'center'}>Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'40%'} ml={'2px'}>
                        <FormControl>
                          <Input type='text'
                            value={firstnameValue}
                            onChange={handleChange}
                            name={`name-${study_id}`}
                            fontSize={14}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'10%'} textAlign={'center'}>
                        <FormControl>
                          <Input type='number'
                            value={lastnameValue}
                            onChange={handleChange}
                            name={`quantity-${study_id}`}
                            fontSize={14}

                          />
                        </FormControl>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <FormControl>
                          <Input type='text'
                            value={emailValue}
                            onChange={handleChange}
                            name={`details-${study_id}`}
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
          isOpen={isOpenDeleteStudy}
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
                      <Th width={'40%'} textAlign={'center'}>Nom</Th>
                      <Th width={'10%'} textAlign={'center'}>Quantité</Th>
                      <Th width={'50%'} textAlign={'center'}>Détails</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'30%'} pl={4}>{firstnameValue}</Td>
                      <Td width={'10%'} textAlign={'center'}>{lastnameValue}</Td>
                      <Td width={'40%'} align='left' pl={4}>{emailValue}</Td>
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
          <Td p={2} pl={4} width={'30%'}>{firstname}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>{lastname}</Td>
          <Td p={2} pl={8} width={'40%'} align='left'>{email}</Td>
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

export default GetStudyItems;