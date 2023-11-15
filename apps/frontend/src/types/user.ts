export type User = {
  name?: string;
  email?: string;
  avatar?: string;
  sex?: string;
  dateBirth?: Date;
  role?: string;
  description?: string;
  location?: string;
  backgroundImage?: string;

  level?: string;
  trainingType?: string[];
  trainingTime?: string;
  caloriesToLose?: number;
  caloriesToBurn?: number;
  readyToTraining?: boolean;

  certificates?: string[];
  merits?: string;
  personalTrainings?: boolean;

  friends?: string[];

  subscriptions?: string[]
};
