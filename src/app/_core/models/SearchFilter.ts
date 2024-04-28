export interface SearchFilter {
  filters: Filter[] | null;
  dateStart: Date | null;
  dateEnd: Date | null;
  controllers: string[] | null;
  endpoints: string[] | null;
  hasException: string | null;
  orderBy: string | null;
  pageSize: number | null;
  pageNo: number | null;

  id: string | null;
}

export interface Filter {
  target: string;
  operation: string;
  value: string;
}
