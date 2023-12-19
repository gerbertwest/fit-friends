import { createSlice } from "@reduxjs/toolkit";
import { OrderProcess } from "../../types/state";
import { NameSpace } from "../../const";
import { createOrder } from "../api-actions";

const initialState: OrderProcess = {
  createStatus: false
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
  }
});
