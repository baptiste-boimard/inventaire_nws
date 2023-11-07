import { createSlice } from "@reduxjs/toolkit";

export interface UtilitiesState {
  postInventoryName: string,
  postInventoryQuantity: number | undefined,
  postInventoryDetails: string,
  editingInventory: any,
};

const initialState: UtilitiesState = {
  postInventoryName: '',
  postInventoryQuantity: undefined,
  postInventoryDetails: '',
  editingInventory: {},

};

const utilitiesSlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    handleFieldChange: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
        

    },
    handleFieldChangeInEditingInventory: (state, action) => {
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

export const {
    handleFieldChange,
    handleFieldChangeInEditingInventory,
    resetInventoryState,
    addInventoryForModalEditing,
    openModalEdit,
    closeModalEdit,
    openModalDelete,
    closeModalDelete,
} = utilitiesSlice.actions;

export default utilitiesSlice.reducer