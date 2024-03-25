import { SearchFilter } from './searchFilter';

export interface SavedSearch {
  Name: string;
  SavedAt: Date;
  Search: SearchFilter;
}
