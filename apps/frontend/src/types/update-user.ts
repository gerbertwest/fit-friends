export type UpdateUser = {
name?: string;
email?: string;
avatar?: File | undefined;
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

certificates?: File | undefined;
merits?: string;
personalTrainings?: boolean;

friends?: string[];

subscriptions?: string[]
}
