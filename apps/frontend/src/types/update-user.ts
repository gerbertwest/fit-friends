export type UpdateUser = {
name?: string | undefined;
email?: string;
avatarFile?: File | undefined;
avatar?: string;
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

certificate?: File | undefined;
merits?: string;
personalTrainings?: boolean | undefined;

friends?: string[];

subscriptions?: string[]
certificates?: string[]
}
