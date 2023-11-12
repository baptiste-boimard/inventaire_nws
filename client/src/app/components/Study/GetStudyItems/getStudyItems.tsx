import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BaseSyntheticEvent, useEffect } from "react";

// == IMPORT CHAKRA UI ==
import {
  Button,
  IconButton,
  Alert,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

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

import { closeErrorDelete } from "../../../slices/studySlice";



function GetStudyItems ({study_id, firstname, lastname, email}: DataStudy ) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { dataStudy, isErrorDeleteForeignKey } = useAppSelector(state => state.studyReducer);
  const { editingStudy } = useAppSelector(state => state.utilitiesReducer);
  
  const firstnameValue: any = editingStudy[`firstname-${study_id}` as any];
  const lastnameValue: any = editingStudy[`lastname-${study_id}` as any];
  const emailValue: any = editingStudy[`email-${study_id}` as any];
  const isOpenEditStudy: any = editingStudy[`isOpenEditStudy-${study_id}` as any];
  const isOpenDeleteStudy: any = editingStudy[`isOpenDeleteStudy-${study_id}` as any];

  // == ACTION ==
  /** Fermeture de l'arlete pour erreur foreign key */
  const handleCloseAlert = () => {
    dispatch(closeErrorDelete());
    handleCloseModalDelete();
  };
  /** Ouverture de la modal Edit */
  const handleOpenModalEdit = () => {
    dispatch(openModalEditStudy(`isOpenEditStudy-${study_id}`));    
  };
  /** Fermeture de la modal Edit */
  const handleCloseModalEdit = () => {
    dispatch(closeModalEditStudy(`isOpenEditStudy-${study_id}`));
  };
  /** Ouverture de la modal delete */
  const handleOpenModalDelete = () => {    
    dispatch(openModalDeleteStudy(`isOpenDeleteStudy-${study_id}`));    
  };
  /** Fermeture de la modal delete */
  const handleCloseModalDelete = () => {
    dispatch(closeModalDeleteStudy(`isOpenDeleteStudy-${study_id}`));
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
    const payload: any= {
      closeModalDelete: `isOpenDeleteStudy-${study_id}`,
      idStudy: study_id!,
    };
    dispatch(deleteStudy(payload));
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
                      <Th width={'25%'} textAlign={'left'}>Prénom</Th>
                      <Th width={'25%'} textAlign={'left'}>Nom</Th>
                      <Th width={'50%'} textAlign={'left'}>Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'25%'} textAlign={'left'}>
                        <FormControl>
                          <Input type='text'
                            value={firstnameValue}
                            onChange={handleChange}
                            name={`firstname-${study_id}`}
                            fontSize={13}
                            p={0}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'25%'} textAlign={'left'}>
                        <FormControl>
                          <Input type='text'
                            value={lastnameValue}
                            onChange={handleChange}
                            name={`lastname-${study_id}`}
                            fontSize={13}
                            p={0}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'50%'} textAlign="left">
                        <FormControl>
                          <Input type='text'
                            value={emailValue}
                            onChange={handleChange}
                            name={`email-${study_id}`}
                            fontSize={13}
                            p={0}
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
            {!isErrorDeleteForeignKey && (
              <ModalCloseButton />
            )}
            <ModalBody>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size={'2xl'}>
                  <Thead>
                    <Tr color={'black'}>
                      <Th width={'25%'} textAlign={'left'}>Prénom</Th>
                      <Th width={'25%'} textAlign={'left'}>Nom</Th>
                      <Th width={'50%'} textAlign={'left'}>Email</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'} fontSize={13}>
                      <Td width={'25%'} textAlign={'left'}>{firstnameValue}</Td>
                      <Td width={'25%'} textAlign={'left'}>{lastnameValue}</Td>
                      <Td width={'50%'} textAlign='left'>{emailValue}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            {isErrorDeleteForeignKey && (
              <Alert status='error' color={'gray'}>
                <AlertTitle>Suprression impossible</AlertTitle>
                <AlertDescription>Le matériel est utilisé dans un prêt</AlertDescription>
                <Button
                  bg={'red'}
                  ml={20}
                  size={'xs'}
                  colorScheme='red'
                  aria-label='Search database'
                  onClick={handleCloseAlert}
                  >
                    Fermer
                  </Button>
                </Alert>
              )}
            {!isErrorDeleteForeignKey && (
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
              )}
          </ModalContent>
        </Modal>
        {/* ===== MODAL DELETE ===== */}

        {/* ===== TABLE ITEM ===== */}
        <Tr color={'black'}>
          <Td p={2} pl={4} width={'20%'}>{firstname}</Td>
          <Td p={2} width={'20%'} textAlign={'left'}>{lastname}</Td>
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