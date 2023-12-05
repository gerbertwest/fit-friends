import { DEFAULT_ORDERS_COUNT_LIMIT, DEFAULT_TRAININGS_COUNT_LIMIT } from "./const";
import { Query } from "./types/query";

const ucFirst = (string: string) => {
  if (!string) return string;

  return string[0].toUpperCase() + string.slice(1);
}

export {ucFirst};

export function getQueryString({limit = DEFAULT_TRAININGS_COUNT_LIMIT, minPrice, maxPrice, minCaloriesCount, maxCaloriesCount, minRaiting, maxRaiting,
  trainingTime, page = 1}: Query): string {

  const time = trainingTime && trainingTime !== null ? trainingTime.join(',') : '';

  return `?limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}
  &minCaloriesCount=${minCaloriesCount}&maxCaloriesCount=${maxCaloriesCount}
  &minRaiting=${minRaiting}&maxRaiting=${maxRaiting}${time !== '' ? `&trainingTime=${time}` : ''}&page=${page}`;
}

export function getSortQueryString({limit= DEFAULT_ORDERS_COUNT_LIMIT, sortDirection, sortField, page = 1}: Query): string {
    return `?limit=${limit}&sortDirection=${sortDirection}&sortField=${sortField}&page=${page}`
}
