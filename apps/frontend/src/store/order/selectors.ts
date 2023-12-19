import { NameSpace } from "../../const";
import { State } from "../../types/state";

export const getCreateOrderStatus = (state: State): boolean => state[NameSpace.Order].createStatus;
