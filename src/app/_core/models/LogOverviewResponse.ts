import { LogOverview } from './LogOverview';

export interface LogOverviewResponse {
  nodes: LogOverview[];
  totalEntries: number;
}
