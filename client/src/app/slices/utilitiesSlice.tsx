import { createSlice } from "@reduxjs/toolkit";

export interface UtilitiesState {
  inventoryName: string,
  inventoryQuantity: string,
  inventoryDetails: string,
};

const initialState: UtilitiesState = {
  inventoryName: '',
  inventoryQuantity: '',
  inventoryDetails: '',
};

const utilitiesSlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    handleFieldChange: (state, action) => {
      [action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {

  },
});

export const { handleFieldChange } = utilitiesSlice.actions;

export default utilitiesSlice.reducer