import { combineReducers } from "@reduxjs/toolkit";
import inventorySlice from './slices/inventorySlice';

const rootReducer = combineReducers({
  inventoryReducer: inventorySlice,
});

export default rootReducer;