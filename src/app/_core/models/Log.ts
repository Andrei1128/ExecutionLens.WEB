export interface Log {
  Class: string;
  Method: string;

  HasException: boolean;

  EntryTime: Date;
  ExitTime: Date;

  Input: object;
  Output: object;

  Interactions: Log[];
  Informations: string[];
}
