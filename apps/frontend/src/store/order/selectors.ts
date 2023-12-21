import { NameSpace } from "../../const";
import { Order } from "../../types/order";
import { State } from "../../types/state";

export const getCreateOrderStatus = (state: State): boolean => state[NameSpace.Order].createStatus;
export const orderSelector = (state: State): {data: Order | null; isLoading: boolean; isError: boolean} => state[NameSpace.Order].order;
