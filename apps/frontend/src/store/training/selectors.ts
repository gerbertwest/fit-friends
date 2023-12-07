import { NameSpace } from "../../const";
import { State } from "../../types/state";
import { TrainerOrder } from "../../types/trainer-order";
import { Training } from "../../types/training";

export const myTrainingsSelector = (state: State): {data: Training[]; isLoading: boolean; isError: boolean} => state[NameSpace.Training].myTrainings;
export const specTrainingsSelector = (state: State): {data: Training[]; isLoading: boolean; isError: boolean} => state[NameSpace.Training].specTrainings;
export const rairingTrainingsSelector = (state: State): {data: Training[]; isLoading: boolean; isError: boolean} => state[NameSpace.Training].raitingTrainings;
export const trainerOrdersSelector = (state: State): {data: TrainerOrder[]; isError: boolean} => state[NameSpace.Training].trainerOrders;
