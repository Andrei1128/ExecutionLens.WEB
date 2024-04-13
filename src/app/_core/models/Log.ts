export interface Log {
  class: string;
  method: string;
  entryTime: Date;
  exitTime: Date;
  inputTypes?: string[];
  input?: any[];
  outputType?: string | null;
  output?: any | null;
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
