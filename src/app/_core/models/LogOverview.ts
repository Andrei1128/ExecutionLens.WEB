export interface LogOverview {
  id: string;
  class: string;
  method: string;
  hasException: boolean;
  entryTime: Date;
  exitTime: Date;
  duration: string;
}
