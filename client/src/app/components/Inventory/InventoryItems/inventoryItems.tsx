// == IMPORT CHAKRA UI ==
import { Box, Button, Container, IconButton } from "@chakra-ui/react";
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
import { DataInventory } from "../../../slices/inventorySlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";

// == IMPORT ACTION ==
import { openModalDelete, openModalEdit, closeModalDelete, closeModalEdit } from "../../../slices/inventorySlice";



function InventoryItems ({inventory_id, name, quantity, details, created_at}: DataInventory ) {
  const dispatch = useAppDispatch();

  // == CALL STORE ==
  const { isOpenEdit, isOpenDelete } = useAppSelector(state => state.inventoryReducer);

  // == ACTION ==
  const handleOpenModalEdit = () => {
    dispatch(openModalEdit())
  };
  const handleCloseModalEdit = () => {
    dispatch(closeModalEdit())
  };
  const handleOpenModalDelete = () => {
    dispatch(openModalDelete())
  };
  const handleCloseModalDelete = () => {
    dispatch(closeModalDelete())
  };

  return (
    <>
      <Tr color={'black'}>
        <Td width={'30%'}>{name}</Td>
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
                        <Editable defaultValue={name} ml={'2px'}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Td>
                      <Td width={'10%'} textAlign={'center'}>
                      <Editable defaultValue={quantity.toString()}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Td>
                      <Td width={'50%'} textAlign="center">
                        <Editable defaultValue={details} mr={'2px'}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' mr={3}>
                Annuler
              </Button>
              <Button colorScheme="green">Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenDelete} onClose={handleCloseModalDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmer la suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='pink' mr={3}>
                Annuler
              </Button>
              <Button colorScheme="green">Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      {/* )} */}
    </>
  );
}

export default InventoryItems;