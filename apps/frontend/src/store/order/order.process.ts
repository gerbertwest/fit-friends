import { createSlice } from "@reduxjs/toolkit";
import { OrderProcess } from "../../types/state";
import { NameSpace } from "../../const";
import { createOrder, fetchOrderAction } from "../api-actions";

const initialState: OrderProcess = {
  createStatus: false,
  order: {
    data: null,
    isError: false,
    isLoading: false,
  },
  orders: {
    data: [],
    isError: false,
    isLoading: false,
  }
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.fulfilled, (state) => {
        state.createStatus = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.createStatus = false
      })
      .addCase(fetchOrderAction.fulfilled, (state, action) => {
        state.order.data = action.payload;
      })
  }
});
