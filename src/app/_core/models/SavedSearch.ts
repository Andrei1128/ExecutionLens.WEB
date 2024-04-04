import { SearchFilter } from './SearchFilter';

export interface SavedSearch {
  Name: string;
  SavedAt: Date;
  Search: SearchFilter;
}
