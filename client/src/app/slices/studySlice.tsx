import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// == IMPORT  ACTION ==
import { closeModalDeleteStudy } from "./utilitiesSlice";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER
});

// export interface DataStudy {
//   study_id?: number,
//   firstname: string,
//   lastname: string,
//   email: string,
// }

export interface DataStudy {
  id: number,
  prenom: string,
  nom: string,
  mail: string,
}

interface StudyState {
  dataStudy: Array<DataStudy>,
  dataStudyDefault: Array<DataStudy>,
  isErrorDeleteForeignKey: boolean,
}

const initialState: StudyState = {
  dataStudy: [],
  dataStudyDefault: [],
  isErrorDeleteForeignKey: false,
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
      })
  }
);

/** Demande au back de supprimer un study */
// export const deleteStudy = createAsyncThunk(
//   'study/deleteStudy',
//   async(payload: any, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     return await instance.delete(`/study/${payload.idStudy}`)
//       .then(() => {
//         dispatch(getStudy());
//         dispatch(closeModalDeleteStudy(payload.closeModalDelete));
//       })
//       .catch((error) => {
//         if(error.response.data.error.message === 'UPDATE ou DELETE sur la table « study » viole la contrainte de clé étrangère « study_id_fk » de la table « loan »')
//           { 
//             dispatch(errorDeleteForeignKeyStudy())      
//           }
//       })
//   }
// );

/** Demande au back de mettre à jour le study */
// export const updateStudy = createAsyncThunk(
//   'study/updateStudy',
//   async(study: DataStudy, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     await instance.patch(`/study/${study.study_id}`, study)
//       .then(() => {
//         dispatch(getStudy());
//       })
//       .catch((error) => {
//       })
//   }
// );

/**Envoi au back un nouveau study */
// export const postStudy = createAsyncThunk(
//   'study/postStudy',
//   async(study: DataStudy,
//   { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     await instance.post('/study', study)
//       .then((response) => {
//         dispatch(getStudy());
//       })
//       .catch((error) => {
//       })
//   }
// )


const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    /** Charge les données de la BDD dans le state dataStudy */
    getStudyToState: (state, action) => {         
        state.dataStudy = action.payload;
    },
    errorDeleteForeignKeyStudy: (state) => {
      state.isErrorDeleteForeignKey = true;
    },
    closeErrorDelete: (state) => {
      state.isErrorDeleteForeignKey = false
    }
  },
  extraReducers(builder) {

  }
});

export const { getStudyToState, errorDeleteForeignKeyStudy, closeErrorDelete } = studySlice.actions;

export default studySlice.reducer;