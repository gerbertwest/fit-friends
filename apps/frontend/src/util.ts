import { DEFAULT_ORDERS_COUNT_LIMIT, DEFAULT_TRAININGS_COUNT_LIMIT, DEFAULT_USERS_COUNT_LIMIT } from "./const";
import { Query } from "./types/query";

const ucFirst = (string: string) => {
  if (!string) return string;

  return string[0].toUpperCase() + string.slice(1);
}

export {ucFirst};

export function getQueryString({limit = DEFAULT_TRAININGS_COUNT_LIMIT, minPrice, maxPrice, minCaloriesCount, maxCaloriesCount, minRaiting, maxRaiting,
  trainingTime, trainingTypes, sortDirection = 'desc', page = 1}: Query): string {

  const time = trainingTime && trainingTime !== null ? trainingTime.join(',') : '';
  const type = trainingTypes && trainingTypes !==null ? trainingTypes.join(',') : '';

  return `?limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}
  &minCaloriesCount=${minCaloriesCount}&maxCaloriesCount=${maxCaloriesCount}
  &minRaiting=${minRaiting}&maxRaiting=${maxRaiting}${time !== '' ? `&trainingTime=${time}` : ''}${type !== '' ? `&trainingTypes=${type}` : ''}&page=${page}&sortDirection=${sortDirection}`;
}

export function getSortQueryString({limit= DEFAULT_ORDERS_COUNT_LIMIT, sortDirection, sortField, page = 1}: Query): string {
    return `?limit=${limit}&sortDirection=${sortDirection}&sortField=${sortField}&page=${page}`
}

export function getUsersQueryString({limit = DEFAULT_USERS_COUNT_LIMIT, level, trainingTypes, locations, sortDirection = 'desc', page = 1}: Query): string {
  const type = trainingTypes && trainingTypes !==null ? trainingTypes.join(',') : '';
  const location = locations && locations !==null ? locations.join(',') : '';
  return `?limit=${limit}${location !== '' ? `&location=${location}` : ''}${type !== '' ? `&trainingType=${type}` : ''}&level=${level}&sortDirection=${sortDirection}&page=${page}`;
}
