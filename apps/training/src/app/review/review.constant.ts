export const DEFAULT_SORT_DIRECTION = 'desc';

export enum Length {
  MinRating = 1,
  MaxRating = 5,
  MinMessage = 100,
  MaxMessage = 1024
}

export enum ReviewError {
  MinRating = `Minimum rating must be ${Length.MinRating}`,
  MaxRating = `Maximum rating must be ${Length.MaxRating}`,
  MinMessage = `Minimum message length must be ${Length.MinMessage}`,
  MaxMessage = `Maximum message length must be ${Length.MaxMessage}`,
}
