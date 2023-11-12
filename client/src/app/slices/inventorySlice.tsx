import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// == IMPORT ACTION ==
import { closeModalDelete } from './utilitiesSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER
});

export interface DataInventory {
  inventory_id?: number,
  name: string,
  details: string,
  quantity: number,
};

interface InventoryState {
  dataInventory: Array<DataInventory>,
  dataInventoryDefault: Array<DataInventory>,
  isErrorDeleteForeignKey: boolean,
};

const initialState: InventoryState = {
  dataInventory: [],
  dataInventoryDefault: [],
  isErrorDeleteForeignKey: false,
};

/** Demande au back tous les inventory */
export const getInventory = createAsyncThunk(
  'inventory/getInventory',
  async(_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.get('/inventory')
      .then((response) => {
        
        return dispatch(getInventoryToState(response.data));
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

/** Demande au back de supprimer un inventory */
export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  async(payload: any, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.delete(`/inventory/${payload.idInventory}`)
      .then(() => {
        dispatch(getInventory());
        dispatch(closeModalDelete(payload.closeModalDelete));
      })
      .catch((error) => {
        if(error.response.data.error.message === 'UPDATE ou DELETE sur la table « inventory » viole la contrainte de clé étrangère « inventory_id_fk » de la table « loan »')
          {
            dispatch(errorDeleteForeignKeyInventory())      
          }
      })
  }
);

/** Demande au back de mettre à jour l'inventory */
export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  async(inventory: Partial<DataInventory>, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.patch(`/inventory/${inventory.inventory_id}`, inventory)
      .then(() => {
        dispatch(getInventory());
      })
      .catch((error) => {
        // console.log(error);
      })
  }
);

/**Envoi au back un nouveau inventory */
export const postInventory = createAsyncThunk(
  'inventory/postInventory',
  async(inventory: Omit<DataInventory, 'created_at' | 'inventory_id'>,
  { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.post('/inventory', inventory)
      .then((response) => {
        dispatch(getInventory());
      })
      .catch((error) => {
        // console.log(error);
      })
  }
)


const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    /** Charge les données de la BDD dans le state dataInventory */
    getInventoryToState: (state, action) => {   
        state.dataInventory = action.payload;
    },
    errorDeleteForeignKeyInventory: (state) => {
      state.isErrorDeleteForeignKey = true;
    },
    closeErrorDelete: (state) => {
      state.isErrorDeleteForeignKey = false
    }
  },
  extraReducers(builder) {

  }
});

export const { getInventoryToState, errorDeleteForeignKeyInventory, closeErrorDelete } = inventorySlice.actions;

export default inventorySlice.reducer;