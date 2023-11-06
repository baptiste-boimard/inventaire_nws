import { createSlice } from "@reduxjs/toolkit";

export interface UtilitiesState {
  inventoryName: string,
  inventoryQuantity: string,
  inventoryDetails: string,
  editingInventory: any,
};

const initialState: UtilitiesState = {
  inventoryName: '',
  inventoryQuantity: '',
  inventoryDetails: '',
  editingInventory: {},

};

const utilitiesSlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    handleFieldChange: (state, action) => {
      state.editingInventory = {
        ...state.editingInventory,
        [action.payload.name]: action.payload.value,
      }
    },
    resetInventoryState: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    addInventoryForModalEditing: (state, action) => {
      
        state.editingInventory = {
          ...state.editingInventory,
          ...action.payload,
      };
    },
    openModalEdit: (state, action) => {    
      
      state.editingInventory = {
        ...state.editingInventory,
        [action.payload]:  true,
      };
    },
    closeModalEdit: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: false,
      };
    },
    openModalDelete: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: true,
      };
    },
    closeModalDelete: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: false,
      };
    },
  },
  extraReducers: (builder) => {

  },
});

export const { handleFieldChange,
    resetInventoryState,
    addInventoryForModalEditing,
    openModalEdit,
    closeModalEdit,
    openModalDelete,
    closeModalDelete,
} = utilitiesSlice.actions;

export default utilitiesSlice.reducer