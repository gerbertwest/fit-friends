export const DEFAULT_TRAININGS_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = 'desc';

export enum Length {
  MinTitle = 1,
  MaxTitle = 15,
  MinDescriprion = 10,
  MaxDescription = 140,
  MinCalories = 1000,
  MaxCalories = 5000,
  MinPrice = 0,
}

export enum TrainingError {
  MinTitleLength = `Minimum title length must be ${Length.MinTitle}`,
  MaxTitleLength = `Maximum title length must be ${Length.MaxTitle}`,
  MinPrice = `Minimum price must be ${Length.MinPrice}`,
  MinCalories = `Minimum calories to lose must be ${Length.MinCalories}`,
  MaxCalories = `Maximum calories to lose must be ${Length.MaxCalories}`,
  MinDescriprionLength = `Minimum description length must be ${Length.MinDescriprion}`,
  MaxDescriprionLength = `Maximum description length must be ${Length.MaxDescription}`,
  SexNotValid = 'The sex is not valid',
  NotExistTraining = 'Training Id not found',
}

export const DEFAULT_STATIC_IMAGES = [
  '/static/promo-1.png',
  '/static/promo-2.png',
  '/static/promo-3.png',
]
