import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL:'http://localhost:3040',
})

export interface DataInventory {
  inventory_id: number,
  name: string,
  details: string,
  quantity: number,
  created_at: string,
}

interface InventoryState {
  dataInventory: Array<DataInventory>,
  dataInventoryDefault: Array<DataInventory>,
}

const initialState: InventoryState = {
  dataInventory: [],
  dataInventoryDefault: [],
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
  async(idInventory: number, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.delete(`/inventory/${idInventory}`)
      .then(() => {
        dispatch(getInventory());
      })
      .catch((error) => {
        console.log(error);
        
      })
  }
);

/** Demande au back de mettre à jour l'inventory */
export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  async(inventory: Omit<DataInventory, 'created_at'>, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.patch(`/inventory/${inventory.inventory_id}`, inventory)
      .then(() => {
        dispatch(getInventory());
      })
      .catch((error) => {
        console.log(error);
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
    
    
  },
    // getInventoryToState = (state, action) {
    //     return {
    //       state.dataInventory: action.payload.data,
    //     }
    // },
  extraReducers(builder) {

  }
});

export const { getInventoryToState } = inventorySlice.actions;

export default inventorySlice.reducer;