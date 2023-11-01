export enum Length {
  MinTitle = 10,
  MaxTitle = 140,
}

export enum AlertError {
  MinTitleLength = `Minimum title length must be ${Length.MinTitle}`,
  MaxTitleLength = `Maximum title length must be ${Length.MaxTitle}`,
}
