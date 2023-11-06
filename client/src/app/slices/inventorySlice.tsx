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
        console.log(response.data);
        return dispatch(getInventoryToState(response.data));
      })
      .catch((error) => {
        console.log(error);
        
      })
});


const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    /** Charge les données de la BDD dans le state dataInventory */
    getInventoryToState: (state, action) => {
      console.log(action.payload);
      
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