import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { TrainingProcess } from "../../types/state";
import { fetchMyTrainingsAction } from "../api-actions";


const initialState: TrainingProcess = {
  myTrainings: {
    data: [],
    isError: false,
    isLoading: false,
  },

};

export const trainingProcess = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {
    setTrainingInfoError: (state, action: PayloadAction<{isError: boolean}>) => {
      const {isError} = action.payload;
      state.myTrainings.isError = isError;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchMyTrainingsAction.pending, (state) => {
      state.myTrainings.isLoading = true;
    })
    .addCase(fetchMyTrainingsAction.fulfilled, (state, action) => {
      state.myTrainings.data = action.payload;
      state.myTrainings.isLoading = false;
    })
    .addCase(fetchMyTrainingsAction.rejected, (state) => {
      state.myTrainings.isError = true;
    })
  }
});

export const {setTrainingInfoError} = trainingProcess.actions;
