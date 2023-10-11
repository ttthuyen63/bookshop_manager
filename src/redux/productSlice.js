import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addproduct = createAsyncThunk(
  "/addproduct",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
    const res = await customAxios.post(`/product`, {
      masp: arg.masp,
      tensp: arg.tensp,
      loaisp: arg.loaisp,
      motasp: arg.motasp,
      giaban: arg.giaban,
      discount: arg.discount,
      image: arg.image,
      trangthai: arg.trangthai,
      kichco: arg.kichco,
    });
    return res.data;
  }
);

export const getListproduct = createAsyncThunk(
  // "productList/getList",
  "/product",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.get(`/productList.json?auth=${token}`);
    const res = await customAxios.get(`/product.json?auth=${token}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addListproduct: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListproduct.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListproduct.fulfilled, (state, action) => {
        const products = action.payload;
        state.loading = false;
        state.data = products;
      })
      .addCase(getListproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add product
      .addCase(addproduct.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addproduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListproduct } = productSlice.actions;
export const selectListproduct = (state) => state.productReducer;
export default productSlice.reducer;
