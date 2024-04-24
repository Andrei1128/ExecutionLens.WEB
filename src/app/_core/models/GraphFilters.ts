export interface GraphFilters {
  dateStart: Date | null;
  dateEnd: Date | null;
  controllers: string[] | null;
  endpoints: string[] | null;
  isEntryPoint: string | null;
}
