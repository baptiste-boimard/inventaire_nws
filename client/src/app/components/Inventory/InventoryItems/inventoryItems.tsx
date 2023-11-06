// == IMPORT CHAKRA UI ==
import { Box, Button, Container, IconButton, Input } from "@chakra-ui/react";
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
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';




// == IMPORT TYPE ==
import { DataInventory,  } from "../../../slices/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { UtilitiesState } from "../../../slices/utilitiesSlice";

// == IMPORT ACTION ==
import { handleFieldChange,
  resetInventoryState,
  addInventoryForModalEditing,
  openModalEdit,
  closeModalEdit,
  openModalDelete,
  closeModalDelete,
} from "../../../slices/utilitiesSlice";
import { BaseSyntheticEvent, useEffect } from "react";



function InventoryItems ({inventory_id, name, quantity, details, created_at}: DataInventory ) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  // const { isOpenDelete } = useAppSelector(state => state.inventoryReducer);
  const {  editingInventory } = useAppSelector(state => state.utilitiesReducer);
  
  const nameValue: any = editingInventory[`name-${inventory_id}` as any];
  const quantityValue: any = editingInventory[`quantity-${inventory_id}` as any];
  const detailsValue: any = editingInventory[`details-${inventory_id}` as any];
  const isOpenEdit: any = editingInventory[`isOpenModalInventoryEdit-${inventory_id}` as any];
  const isOpenDelete: any = editingInventory[`isOpenModalInventoryDelete-${inventory_id}` as any];

  // const nameValue = useAppSelector(state => state.inventoryReducer.editingInventory[`name-${inventory_id}` as any])
  // == ACTION ==
  const handleOpenModalEdit = () => {
    dispatch(openModalEdit(`isOpenModalInventoryEdit-${inventory_id}`))
    console.log(isOpenEdit);
    
  };
  const handleCloseModalEdit = () => {
    dispatch(closeModalEdit(`isOpenModalInventoryEdit-${inventory_id}`))
    // dispatch(resetInventoryState());
  };
  const handleOpenModalDelete = () => {
    dispatch(openModalDelete())
    console.log(editingInventory);
    
    console.log(nameValue, quantityValue,  detailsValue);
    
  };
  const handleCloseModalDelete = () => {
    // dispatch(closeModalDelete())
  };
  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault(); 
    const changePayload = {
      name: e.target.name,
      value: e.target.value,
    };
    console.log(changePayload);
    
    dispatch(handleFieldChange(changePayload));    
  };
  const handleSubmit = (e:React.FormEvent) => {
    console.log(name, details);
  };

  useEffect(() => {
    const createEditingInventory:any = {
      [`isOpenModalInventoryEdit-${inventory_id}`]: false,
      [`isOpenModalInventoryDelete-${inventory_id}`]: false,
      [`name-${inventory_id}`]: name,
      [`quantity-${inventory_id}`]: quantity,
      [`details-${inventory_id}`]: details,
    };
    dispatch(addInventoryForModalEditing(createEditingInventory));
  }, [])

  return (
    <>
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
                      <Th width={'40%'}>Nom</Th>
                      <Th width={'10%'}>Quantité</Th>
                      <Th width={'50%'} textAlign={'center'}>Détails</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr color={'black'}>
                      <Td width={'40%'} ml={'2px'}>
                        {/* <Editable className={`name-${inventory_id}`} value={nameValue} ml={'2px'}>
                          <EditablePreview />
                          <EditableInput onChange={handleChange} name={`name-${inventory_id}`} value={nameValue}/>
                        </Editable> */}
                        <Input value={nameValue} name={`name-${inventory_id}`} onChange={handleChange}/>
                      </Td>
                      <Td width={'10%'} textAlign={'center'}>
                      <Editable value={quantityValue}>
                          <EditablePreview />
                          <EditableInput onChange={handleChange} name={`name-${inventory_id}`} value={quantityValue}/>
                        </Editable>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <Editable value={detailsValue} placeholder={detailsValue} mr={'2px'}>
                          <EditablePreview />
                          <EditableInput onChange={handleChange} name="inventoryDetails" value={detailsValue}/>
                        </Editable>
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
        <Tr color={'black'}>
          <Td width={'30%'}>{nameValue}</Td>
          <Td width={'10%'} textAlign={'center'}>{quantity}</Td>
          <Td width={'40%'} align='left'>{details}</Td>
          <Td width={'10%'} textAlign={'center'}>
            <IconButton
              onClick={handleOpenModalEdit}
              colorScheme='green'
              aria-label='Editer'
              icon={<EditIcon />}
              />
          </Td>
          <Td width={'10%'} textAlign='center'>
            <IconButton
              onClick={handleOpenModalDelete}
              colorScheme='pink'
              aria-label='Supprimer'
              icon={<DeleteIcon />}
              />
          </Td>
        </Tr>
        
        <Modal isOpen={isOpenDelete} onClose={handleCloseModalDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {nameValue} {detailsValue}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='pink' mr={3}>
                Annuler
              </Button>
              <Button colorScheme="green">Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
}

export default InventoryItems;