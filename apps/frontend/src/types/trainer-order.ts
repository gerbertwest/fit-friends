import { Training } from "./training";

export type TrainerOrder = {
orderId?: number;
idCount: number;
totalPrice: number;
training: Training;
active: boolean;
}
