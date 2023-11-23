export type Query = {
  limit?: number,
  minPrice?: number,
  maxPrice?: number,
  minCaloriesCount?: number,
  maxCaloriesCount?: number,
  minRaiting?: number,
  maxRaiting?: number,
  trainingTypes?: string[],
  trainingTime?: string[],
  sortDirection?: string,
  page?: number,
  sortField?: string
}
