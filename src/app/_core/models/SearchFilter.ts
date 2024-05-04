export interface SearchFilter {
  filters: Filter[] | null;
  dateStart: Date | null;
  dateEnd: Date | null;
  classes: string[] | null;
  methods: string[] | null;
  hasException: number;
  orderBy: number;
  pageSize: number | null;
  pageNo: number | null;

  id: string | null;
}

export interface Filter {
  target: number;
  operation: number;
  value: string;
}
