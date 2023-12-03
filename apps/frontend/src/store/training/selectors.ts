import { NameSpace } from "../../const";
import { State } from "../../types/state";
import { TrainerOrder } from "../../types/trainer-order";
import { Training } from "../../types/training";

export const myTrainingsSelector = (state: State): {data: Training[]; isLoading: boolean; isError: boolean} => state[NameSpace.Training].myTrainings;
export const trainerOrdersSelector = (state: State): {data: TrainerOrder[]; isError: boolean} => state[NameSpace.Training].trainerOrders;
