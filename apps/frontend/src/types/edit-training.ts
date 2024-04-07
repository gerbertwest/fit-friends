export type EditTraining = {
  id: number;
  title: string;
  price: number;
  description: string;
  special: boolean;
  video?: string;
  videoFile?: File | undefined;
}
