import { Injectable } from '@angular/core';
import { SearchFilter } from '../models/SearchFilter';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private search: SearchFilter | null = null;

  setData(search: SearchFilter | null) {
    this.search = search;
  }

  getData(): SearchFilter | null {
    return this.search;
  }
}
