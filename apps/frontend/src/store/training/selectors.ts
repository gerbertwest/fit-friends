import { NameSpace } from "../../const";
import { State } from "../../types/state";
import { Training } from "../../types/training";

export const myTrainingsSelector = (state: State): {data: Training[]; isLoading: boolean; isError: boolean} => state[NameSpace.Training].myTrainings;

