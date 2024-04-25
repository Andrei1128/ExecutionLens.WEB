export interface MethodException {
  nodeId: string;
  occuredAt: Date;
  exception: any;
}

export interface MethodExceptionsResponse {
  totalEntries: number;
  exceptions: MethodException[];
}
