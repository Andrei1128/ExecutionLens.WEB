export interface Log {
  class: string;
  method: string;
  entryTime: Date;
  exitTime: Date;
  input: Property[] | null;
  output: Property | null;
  informations: InformationLog[];
  interactions: Log[];
  hasException: boolean;
}

export interface InformationLog {
  timestamp: Date;
  logLevel?: string | null;
  message?: string | null;
  exception?: Error | null;
}

export interface Property {
  type: string;
  value: string;
}
