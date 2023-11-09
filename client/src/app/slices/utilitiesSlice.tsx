import { createSlice } from "@reduxjs/toolkit";

export interface UtilitiesState {
  postInventoryName: string,
  postInventoryQuantity: number | undefined,
  postInventoryDetails: string,
  postStudyFirstname: string,
  postStudyLastname: string,
  postStudyEmail: string,
  postLoanQuantity: number | undefined,
  postLoanIdInventory: number | undefined,
  postLoanidStudy: number | undefined,
  editingInventory: any,
  editingStudy: any,
  editingLoan: any,
};

const initialState: UtilitiesState = {
  postInventoryName: '',
  postInventoryQuantity: undefined,
  postInventoryDetails: '',
  postStudyFirstname: '',
  postStudyLastname: '',
  postStudyEmail: '',
  postLoanQuantity: undefined,
  postLoanIdInventory: undefined,
  postLoanidStudy: undefined,
  editingInventory: {},
  editingStudy: {},
  editingLoan: {},

  
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
    handleFieldChangeInEditingLoan: (state, action) => {
      state.editingLoan = {
        ...state.editingLoan,
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
    addLoanForModalEditing: (state, action) => {
      
      state.editingLoan = {
        ...state.editingLoan,
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
    openModalEditLoan: (state, action) => {    
      
      state.editingLoan = {
        ...state.editingLoan,
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
    closeModalEditLoan: (state, action) => {
      state.editingLoan= {
        ...state.editingLoan,
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
    openModalDeleteLoan: (state, action) => {
      state.editingLoan= {
        ...state.editingLoan,
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
    closeModalDeleteLoan: (state, action) => {
      state.editingLoan= {
        ...state.editingLoan,
        [action.payload]: false,
      };
    },
    editPostLoanIdInventory: (state, action) => {
      state.postLoanIdInventory = parseInt(action.payload, 10);
    },
    editPostLoanIdStudy: (state, action) => {
      state.postLoanidStudy = parseInt(action.payload, 10);
    },
  },
  extraReducers: (builder) => {
  },
});

export const {
    handleFieldChange,
    handleFieldChangeInEditingInventory,
    handleFieldChangeInEditingStudy,
    handleFieldChangeInEditingLoan,
    // resetInventoryState,
    addInventoryForModalEditing,
    addStudyForModalEditing,
    addLoanForModalEditing,
    openModalEdit,
    openModalEditStudy,
    openModalEditLoan,
    closeModalEdit,
    closeModalEditStudy,
    closeModalEditLoan,
    openModalDelete,
    openModalDeleteStudy,
    openModalDeleteLoan,
    closeModalDelete,
    closeModalDeleteStudy,
    closeModalDeleteLoan,
    editPostLoanIdInventory,
    editPostLoanIdStudy,
} = utilitiesSlice.actions;

export default utilitiesSlice.reducer