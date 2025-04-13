import { PaginationMeta } from "./pagination-meta";

export interface PaginatedResponseDTO<T> {
    success: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta;
  }