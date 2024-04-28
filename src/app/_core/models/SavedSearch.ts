import { SearchFilter } from './SearchFilter';

export interface SavedSearch {
  id: string | null;
  name: string;
  savedAt: Date | null;
  search: SearchFilter;
}
