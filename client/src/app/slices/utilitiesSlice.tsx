import { createSlice } from "@reduxjs/toolkit";

export interface UtilitiesState {
  postInventoryName: string,
  postInventoryQuantity: number | undefined,
  postInventoryDetails: string,
  postStudyFirstname: string,
  postStudyLastname: string,
  postStudyEmail: string,
  postLoanQuantity: number | undefined,
  editingInventory: any,
  editingStudy: any,
};

const initialState: UtilitiesState = {
  postInventoryName: '',
  postInventoryQuantity: undefined,
  postInventoryDetails: '',
  postStudyFirstname: '',
  postStudyLastname: '',
  postStudyEmail: '',
  postLoanQuantity: undefined,
  editingInventory: {},
  editingStudy: {},
  
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
    handleFieldChangeInEditingStudy: (state, action) => {
      state.editingStudy = {
        ...state.editingStudy,
        [action.payload.name]: action.payload.value,
      }
    },
    // resetInventoryState: (state, action) => {
    //   return {
    //     ...state,
    //     [action.payload.name]: action.payload.value,
    //   };
    // },
    addInventoryForModalEditing: (state, action) => {
      
        state.editingInventory = {
          ...state.editingInventory,
          ...action.payload,
      };
    },
    addStudyForModalEditing: (state, action) => {
      
      state.editingStudy = {
        ...state.editingStudy,
        ...action.payload,
      };
    },
    openModalEdit: (state, action) => {    
      
      state.editingInventory = {
        ...state.editingInventory,
        [action.payload]: true,
      };
    },
    openModalEditStudy: (state, action) => {    
      
      state.editingStudy = {
        ...state.editingStudy,
        [action.payload]: true,
      };
    },
    closeModalEdit: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: false,
      };
    },
    closeModalEditStudy: (state, action) => {
      state.editingStudy= {
        ...state.editingStudy,
        [action.payload]: false,
      };
    },
    openModalDelete: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: true,
      };
    },
    openModalDeleteStudy: (state, action) => {
      state.editingStudy= {
        ...state.editingStudy,
        [action.payload]: true,
      };
    },
    closeModalDelete: (state, action) => {
      state.editingInventory= {
        ...state.editingInventory,
        [action.payload]: false,
      };
    },
    closeModalDeleteStudy: (state, action) => {
      state.editingStudy= {
        ...state.editingStudy,
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
    handleFieldChangeInEditingStudy,
    // resetInventoryState,
    addInventoryForModalEditing,
    addStudyForModalEditing,
    openModalEdit,
    openModalEditStudy,
    closeModalEdit,
    closeModalEditStudy,
    openModalDelete,
    openModalDeleteStudy,
    closeModalDelete,
    closeModalDeleteStudy,
} = utilitiesSlice.actions;

export default utilitiesSlice.reducer