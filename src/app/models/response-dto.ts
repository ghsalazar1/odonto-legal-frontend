import { PaginationMeta } from "./pagination-meta";

export interface ResponseDTO<T> {
    hasError: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta;
  }