import { combineReducers } from "@reduxjs/toolkit";
import inventorySlice from './slices/inventorySlice';
import utilitiesSlice from "./slices/utilitiesSlice";

const rootReducer = combineReducers({
  inventoryReducer: inventorySlice,
  utilitiesReducer: utilitiesSlice,
});

export default rootReducer;