export type UpdateUser = {
name?: string | undefined;
email?: string;
avatar?: File | undefined;
sex?: string | undefined;
dateBirth?: Date;
role?: string;
description?: string;
location?: string | undefined;
backgroundImage?: string;

level?: string | undefined;
trainingType?: string[] | undefined;
trainingTime?: string;
caloriesToLose?: number;
caloriesToBurn?: number;
readyToTraining?: boolean;

certificates?: File | undefined;
merits?: string;
personalTrainings?: boolean | undefined;

friends?: string[];

subscriptions?: string[]
}
