import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user/user-process';
import { trainingProcess } from './training/training-process';
import { orderProcess } from './order/order.process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Training]: trainingProcess.reducer,
  [NameSpace.Order]: orderProcess.reducer,
});
