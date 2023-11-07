import { combineReducers } from "@reduxjs/toolkit";
import inventorySlice from './slices/inventorySlice';
import studySlice from './slices/studySlice';
import utilitiesSlice from "./slices/utilitiesSlice";

const rootReducer = combineReducers({
  inventoryReducer: inventorySlice,
  studyReducer: studySlice,
  utilitiesReducer: utilitiesSlice,
});

export default rootReducer;