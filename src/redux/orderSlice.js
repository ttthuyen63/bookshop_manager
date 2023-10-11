import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addorder = createAsyncThunk("/addorder", async (arg, thunkApi) => {
  const token = thunkApi.getState().userReducer.token;
  // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
  const res = await customAxios.post(`/booking`, {
    idorder: arg.idorder,
    description: arg.description,
    listURL: arg.listURL,
    orderID: arg.orderID,
    orderNumber: arg.orderNumber,
    orderName: arg.orderName,
    numberBed: arg.numberBed,
    maxQuantity: arg.maxQuantity,
    price: arg.price,
    status: arg.status,
  });
  return res.data;
});

export const getListorder = createAsyncThunk(
  // "orderList/getList",
  "/booking",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.get(`/orderList.json?auth=${token}`);
    const res = await customAxios.get(`/booking.json?auth=${token}`);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addListorder: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListorder.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListorder.fulfilled, (state, action) => {
        const orders = action.payload;
        state.loading = false;
        state.data = orders;
      })
      .addCase(getListorder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add order
      .addCase(addorder.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addorder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addorder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListorder } = orderSlice.actions;
export const selectListorder = (state) => state.orderReducer;
export default orderSlice.reducer;
