import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER
});

export interface DataLoan {
  loan_id?: number,
  inventory_id: number | undefined,
  study_id: number,
  quantity?: number,
  loaning_date?: string,
  due_date?: string,
  enclose?: boolean,
  firstname?: string,
  name?: string,
  lastname?: string,
  email?: string;
  loan_quantity?: number | undefined,
  details?: string,
};

export interface Relaunch {
  name: string,
  loan_quantity: number,
  loaning_date: string,
  due_date: string,
  email: string,
};

interface LoanState {
  dataLoan: Array<DataLoan>,
  dataLoanDefault: Array<DataLoan>,
};

const initialState: LoanState= {
  dataLoan: [],
  dataLoanDefault: [],
};

/** Demande au back tous les loan */
export const getLoan = createAsyncThunk(
  'loan/getLoan',
  async(_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.get('/loan')
      .then((response) => {        
        return dispatch(getLoanToState(response.data));
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

/** Envoi d'un mail de rappel à l'étudiant */
export const studyRelaunch = createAsyncThunk(
  'loan/studyRelaunch',
  async(relaunch: Relaunch, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.post('/loan/relaunch', relaunch)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }
);

/** Envoi à la BDD un nouvel emprunt */
export const postLoan = createAsyncThunk(
  'loan/postLoan',
  async(loan: DataLoan,
  { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    
    await instance.post(`/loan/${loan.inventory_id}/${loan.study_id}`, loan)
      .then((response) => {    
        // console.log('loanSlice',response);
        dispatch(getLoan());
            
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

/** Demande au back de supprimer un pret */
export const deleteLoan = createAsyncThunk(
  'loan/deleteLoan',
  async(idLoan: number, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.delete(`/loan/${idLoan}`)
      .then(() => {
        dispatch(getLoan());
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    /** Charge les données de la BDD dans le state dataStudy */
    getLoanToState: (state, action) => {       
      state.dataLoan = action.payload;
    },
  },
  extraReducers(builder) {

  },
});

export const  { getLoanToState } = loanSlice.actions;

export default loanSlice.reducer;