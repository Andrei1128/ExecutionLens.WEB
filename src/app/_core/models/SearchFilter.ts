export interface SearchFilter {
  Filters: Filter[] | null;
  DateStart: Date | null;
  DateEnd: Date | null;
  Controllers: string[] | null;
  Endpoints: string[] | null;
  WithException: boolean | null;
  OrderBy: string | null;
  PageSize: number | null;

  Id: string | null;
}

export interface Filter {
  Target: string;
  Operation: string;
  Value: string;
}
