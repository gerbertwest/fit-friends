import { DEFAULT_TRAININGS_COUNT_LIMIT } from "./const";
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
