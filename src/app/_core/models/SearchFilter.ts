export interface SearchFilter {
  Filters: Filter[];
  DateStart: Date;
  DateEnd: Date;
  Controllers: string[];
  Endpoints: string[];
  WithException: boolean;
  OrderBy: string;
  PageSize: number;

  Id: string;
}

export interface Filter {
  Target: string;
  Operation: string;
  Value: string;
}
