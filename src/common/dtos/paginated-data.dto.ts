export class PaginatedDataDto<T> {
  data: T[];
  totalCount?: number;
}
