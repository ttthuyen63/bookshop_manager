import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const adduser = createAsyncThunk("/adduser", async (arg, thunkApi) => {
  const token = thunkApi.getState().userReducer.token;
  // const res = await customAxios.post(`/orderList.json?auth=${token}`, {
  const res = await customAxios.post(`/user`, {
    MAKH: arg.MAKH,
    TENKH: arg.TENKH,
    DIENTHOAI: arg.DIENTHOAI,
    DIACHI: arg.DIACHI,
    EMAIL: arg.EMAIL,
    PASSWORD: arg.PASSWORD,
  });
  return res.data;
});

export const getListuser = createAsyncThunk(
  // "userList/getList",
  "/user",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.get(`/userList.json?auth=${token}`);
    const res = await customAxios.get(`/user.json?auth=${token}`);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addListuser: (state, action) => {
      // const orders = action.payload;
      // return { ...orders };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListuser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListuser.fulfilled, (state, action) => {
        const users = action.payload;
        state.loading = false;
        state.data = users;
      })
      .addCase(getListuser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add user
      .addCase(adduser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(adduser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListuser } = userSlice.actions;
export const selectListuser = (state) => state.userReducer;
export default userSlice.reducer;
