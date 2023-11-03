//export const DEFAULT_TASK_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_ORDER_TYPE = 'абонемент';
export const DEFAULT_SORT_FIELD = 'idCount'

export enum Length {
  MinCount = 1,
  MaxCount = 50,
}

export enum OrderError {
  MinCount = `Minimum calories to lose must be ${Length.MinCount}`,
  MaxCount = `Maximum calories to lose must be ${Length.MinCount}`,
}


