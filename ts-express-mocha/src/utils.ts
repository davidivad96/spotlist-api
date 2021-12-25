import { PaginationParams } from './interfaces';

const getPaginationParams = (dataLength: number, offset: number, limit?: number): PaginationParams => ({
  hasMore: limit ? dataLength >= limit : false,
  offset: limit && dataLength >= limit ? offset + limit : 0,
  count: dataLength,
});

export { getPaginationParams };
