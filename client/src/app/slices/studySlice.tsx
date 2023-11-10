import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER
});

export interface DataStudy {
  study_id?: number,
  firstname: string,
  lastname: string,
  email: string,
}

interface StudyState {
  dataStudy: Array<DataStudy>,
  dataStudyDefault: Array<DataStudy>,
}

const initialState: StudyState = {
  dataStudy: [],
  dataStudyDefault: [],
};

/** Demande au back tous les study */
export const getStudy = createAsyncThunk(
  'study/getStudy',
  async(_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.get('/study')
      .then((response) => {
        return dispatch(getStudyToState(response.data));
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

/** Demande au back de supprimer un study */
export const deleteStudy = createAsyncThunk(
  'study/deleteStudy',
  async(idStudy: number, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return await instance.delete(`/study/${idStudy}`)
      .then(() => {
        dispatch(getStudy());
      })
      .catch((error) => {
        // console.log(error);
        
      })
  }
);

/** Demande au back de mettre à jour le study */
export const updateStudy = createAsyncThunk(
  'study/updateStudy',
  async(study: DataStudy, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.patch(`/study/${study.study_id}`, study)
      .then(() => {
        dispatch(getStudy());
      })
      .catch((error) => {
        // console.log(error);
      })
  }
);

/**Envoi au back un nouveau study */
export const postStudy = createAsyncThunk(
  'study/postStudy',
  async(study: DataStudy,
  { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    await instance.post('/study', study)
      .then((response) => {
        dispatch(getStudy());
      })
      .catch((error) => {
        // console.log(error);
      })
  }
)


const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    /** Charge les données de la BDD dans le state dataStudy */
    getStudyToState: (state, action) => {         
        state.dataStudy = action.payload;
    },
  },
  extraReducers(builder) {

  }
});

export const { getStudyToState } = studySlice.actions;

export default studySlice.reducer;