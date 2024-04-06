export interface LogOverview {
  Id: string;
  Controller: string;
  Endpoint: string;
  HasException: boolean;
  EntryTime: Date;
  ExitTime: Date;
  Duration: string;
}
