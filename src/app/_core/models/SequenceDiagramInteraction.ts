export interface SequenceDiagramInteraction {
  timestamp: number;
  interactor: string;
  interactee: string | null;
  message: string | null;
  arrow: string | null;
  note: string | null;

  hasException: boolean;
  content: string;
}
