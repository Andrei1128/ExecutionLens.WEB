import { LogOverviewResponse } from './LogOverviewResponse';
import { SearchFilter } from './SearchFilter';

export interface NLPSearchResponse {
  result: LogOverviewResponse;
  filters: SearchFilter;
}
