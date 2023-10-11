import { createSlice, configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import roomSlice from "./roomSlice";
import roomReducer from "./roomSlice";
import productReducer from "./productSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    orderReducer: orderSlice,
    userReducer: userSlice,
    roomReducer: roomReducer,
    productReducer: productReducer,
  },
});
