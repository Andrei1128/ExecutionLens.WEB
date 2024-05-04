export interface GraphFilters {
  dateStart: Date | null;
  dateEnd: Date | null;
  classes: string[] | null;
  methods: string[] | null;
  isEntryPoint: number;
}
