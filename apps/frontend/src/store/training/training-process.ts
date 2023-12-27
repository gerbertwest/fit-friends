import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { TrainingProcess } from "../../types/state";
import { fetchMyTrainingsAction, fetchMyTrainingsByIdAction, fetchRaitingTrainingsAction, fetchSpecTrainingsAction, fetchTrainerOrdersAction, fetchTrainingByIdAction, fetchTrainingsAction } from "../api-actions";


const initialState: TrainingProcess = {
  myTrainings: {
    data: [],
    isError: false,
    isLoading: false,
  },
  specTrainings: {
    data: [],
    isError: false,
    isLoading: false,
  },
  raitingTrainings: {
    data: [],
    isError: false,
    isLoading: false,
  },
  trainerOrders: {
    data: [],
    isError: false,
  },
  training: {
    data: null,
    isError: false,
    isLoading: false,
  }

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
    .addCase(fetchMyTrainingsByIdAction.fulfilled, (state, action) => {
      state.myTrainings.data = action.payload;
    })
    .addCase(fetchTrainerOrdersAction.fulfilled, (state, action) => {
      state.trainerOrders.data = action.payload;
    })
    .addCase(fetchTrainerOrdersAction.rejected, (state) => {
      state.trainerOrders.isError = true;
    })
    .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
      state.myTrainings.data = action.payload;
    })
    .addCase(fetchTrainingsAction.rejected, (state) => {
      state.myTrainings.isError = true;
    })
    .addCase(fetchSpecTrainingsAction.fulfilled, (state, action) => {
      state.specTrainings.data = action.payload;
    })
    .addCase(fetchSpecTrainingsAction.rejected, (state) => {
      state.specTrainings.isError = true;
    })
    .addCase(fetchRaitingTrainingsAction.fulfilled, (state, action) => {
      state.raitingTrainings.data = action.payload;
    })
    .addCase(fetchRaitingTrainingsAction.rejected, (state) => {
      state.raitingTrainings.isError = true;
    })
    .addCase(fetchTrainingByIdAction.fulfilled, (state, action) => {
      state.training.data = action.payload;
    })
  }
});

export const {setTrainingInfoError} = trainingProcess.actions;
