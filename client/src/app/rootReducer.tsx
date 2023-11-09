import { combineReducers } from "@reduxjs/toolkit";
import inventorySlice from './slices/inventorySlice';
import studySlice from './slices/studySlice';
import utilitiesSlice from "./slices/utilitiesSlice";
import loanSlice from "./slices/loanSlice";

const rootReducer = combineReducers({
  inventoryReducer: inventorySlice,
  studyReducer: studySlice,
  utilitiesReducer: utilitiesSlice,
  loanReducer: loanSlice,
});

export default rootReducer;