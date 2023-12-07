export type NewTraining = {
  title: string;
  level: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesCount: number;
  description: string;
  sex: string;
  video: File | undefined;
  special: boolean;
}
