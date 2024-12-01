export interface IParams {
  [key: string]: any;
}
export interface IQueryParams {
  enabled?: boolean;
  params?: IParams;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export type IPaginatedResponse<T, K extends string> = {
  total: number;
  page: number;
  limit: number;
} & { [key in K]: T[] };
