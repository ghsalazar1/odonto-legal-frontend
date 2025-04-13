import { PaginationMeta } from "./pagination-meta";

export interface PaginatedResponseDTO<T> {
    hasError: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta;
  }