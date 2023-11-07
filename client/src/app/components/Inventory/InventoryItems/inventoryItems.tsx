import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BaseSyntheticEvent, useEffect } from "react";

// == IMPORT CHAKRA UI ==
import { Button, IconButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FormControl,  Input } from '@chakra-ui/react'

// == IMPORT TYPE ==
import { DataInventory, deleteInventory, updateInventory,  } from "../../../slices/inventorySlice";

// == IMPORT ACTION ==
import { 
  handleFieldChangeInEditingInventory, 
  addInventoryForModalEditing, 
  openModalEdit,
  closeModalEdit,
  openModalDelete,
  closeModalDelete,
} from "../../../slices/utilitiesSlice";



function InventoryItems ({inventory_id, name, quantity, details, created_at}: DataInventory ) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { dataInventory } = useAppSelector(state => state.inventoryReducer);
  const {  editingInventory } = useAppSelector(state => state.utilitiesReducer);
  
  const nameValue: any = editingInventory[`name-${inventory_id}` as any];
  const quantityValue: any = editingInventory[`quantity-${inventory_id}` as any];
  const detailsValue: any = editingInventory[`details-${inventory_id}` as any];
  const isOpenEdit: any = editingInventory[`isOpenModalInventoryEdit-${inventory_id}` as any];
  const isOpenDelete: any = editingInventory[`isOpenModalInventoryDelete-${inventory_id}` as any];

  // == ACTION ==
  /** Ouverture de la modal Edit */
  const handleOpenModalEdit = () => {
    dispatch(openModalEdit(`isOpenModalInventoryEdit-${inventory_id}`));    
  };
  /** Fermeture de la modal Edit */
  const handleCloseModalEdit = () => {
    dispatch(closeModalEdit(`isOpenModalInventoryEdit-${inventory_id}`));
  };
  /** Ouverture de la modal delete */
  const handleOpenModalDelete = () => {    
    dispatch(openModalDelete(`isOpenModalInventoryDelete-${inventory_id}`));    
  };
  /** Fermeture de la modal delete */
  const handleCloseModalDelete = () => {
    dispatch(closeModalDelete(`isOpenModalInventoryDelete-${inventory_id}`));    
  };
  /** Gestion des chanmps controlés */
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault(); 
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };    
    dispatch(handleFieldChangeInEditingInventory(changePayload));    
  };
  /** Soumission du formulaire au back pour la modification d'un inventory */
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const inventory: Omit<DataInventory, 'created_at'> = {
      inventory_id: inventory_id ,
      name: nameValue,
      quantity: parseInt(quantityValue, 10),
      details: detailsValue,
    };
    dispatch(updateInventory(inventory));
    handleCloseModalEdit();
  };
  /** Demande au back la suppression d'un inventory */
  const handleDeleteInventory = () => {
    dispatch(deleteInventory(inventory_id));
    handleCloseModalDelete();
  }
  /** Création dans le slice utilities des variable permettant l'eidtion dynamique */
  useEffect(() => {
    const createEditingInventory:any = {
      [`isOpenModalInventoryEdit-${inventory_id}`]: false,
      [`isOpenModalInventoryDelete-${inventory_id}`]: false,
      [`name-${inventory_id}`]: name,
      [`quantity-${inventory_id}`]: quantity,
      [`details-${inventory_id}`]: details,
    };
    dispatch(addInventoryForModalEditing(createEditingInventory));
  }, [dataInventory, details, dispatch, inventory_id, name, quantity])

  return (
    <>
      {/* ===== MODAL EDIT ===== */}
      <Modal isOpen={isOpenEdit} onClose={handleCloseModalEdit} size={'lg'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edition de l'article</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size={'3xl'}>
                  <Thead>
                    <Tr color={'black'}>
                      <Th width={'40%'} textAlign={'center'}>Nom</Th>
                      <Th width={'10%'} textAlign={'center'}>Quantité</Th>
                      <Th width={'50%'} textAlign={'center'}>Détails</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'40%'} ml={'2px'}>
                        <FormControl>
                          <Input type='text'
                            value={nameValue}
                            onChange={handleChange}
                            name={`name-${inventory_id}`}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'10%'} textAlign={'center'}>
                        <FormControl>
                          <Input type='number'
                            value={quantityValue}
                            onChange={handleChange}
                            name={`quantity-${inventory_id}`}
                          />
                        </FormControl>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <FormControl>
                          <Input type='text'
                            value={detailsValue}
                            onChange={handleChange}
                            name={`details-${inventory_id}`}
                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' mr={3} onClick={handleCloseModalEdit}>
                Annuler
              </Button>
              <Button colorScheme="green" onClick={handleSubmit}>Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ===== MODAL EDIT ===== */}


        {/* ===== MODAL DELETE ===== */}
        <Modal isOpen={isOpenDelete} onClose={handleCloseModalDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant='striped' colorScheme='gray' size={'3xl'}>
                  <Thead>
                    <Tr color={'black'}>
                      <Th width={'40%'} textAlign={'center'}>Nom</Th>
                      <Th width={'10%'} textAlign={'center'}>Quantité</Th>
                      <Th width={'50%'} textAlign={'center'}>Détails</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'30%'}>{nameValue}</Td>
                      <Td width={'10%'} textAlign={'center'}>{quantityValue}</Td>
                      <Td width={'40%'} align='left'>{detailsValue}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' mr={3} onClick={handleCloseModalDelete}>
                Annuler
              </Button>
              <Button colorScheme="green" onClick={handleDeleteInventory}>Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ===== MODAL DELETE ===== */}

        {/* ===== TABLE ITEM ===== */}
        <Tr color={'black'}>
          <Td p={2} pl={4} width={'30%'}>{name}</Td>
          <Td p={2} width={'10%'} textAlign={'center'}>{quantity}</Td>
          <Td p={2} pl={8} width={'40%'} align='left'>{details}</Td>
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

export default InventoryItems;