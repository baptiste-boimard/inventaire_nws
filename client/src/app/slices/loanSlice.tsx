import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER
});

export interface DataLoan {
  loan_id?: number,
  inventory_id: number,
  study_id: number,
  quantity: number,
  enclose?: boolean,
};

interface LoanState {
  dataLoan: Array<DataLoan>,
  dataLoanDefault: Array<DataLoan>,
};

const initialState: LoanState= {
  dataLoan: [],
  dataLoanDefault: [],
};

/** Envoi à la BDD un nouvel emprunt */
export const postLoan = createAsyncThunk(
  'loan/postLoan',
  async(loan: DataLoan,
  { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.post('/loan', loan)
      .then((response) => {
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
        
      })
  }
);

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {

  },
  extraReducers(builder) {

  },
});

export const  {} = loanSlice.actions;

export default loanSlice.reducer;