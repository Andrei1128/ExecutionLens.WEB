import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedSearch } from '../../_core/models/SavedSearch';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import { Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { LogService } from '../../_core/services/log.service';
import { DataService } from '../../_core/services/data.service';
import { SearchFilter } from '../../_core/models/SearchFilter';

@Component({
  selector: 'app-saved-searches',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DateFormatPipe,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './saved-searches.component.html',
  styleUrl: './saved-searches.component.scss',
})
export class SavedSearchesComponent implements OnInit {
  searches: SavedSearch[] = [];

  constructor(
    private logService: LogService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.logService.getSearches().subscribe((searches) => {
      this.searches = searches;
      console.log(this.searches);
    });
  }

  loadSearch(search: SearchFilter): void {
    this.dataService.setData(search);
    this.router.navigate(['/search']);
  }

  deleteSearch(searchId: string): void {
    this.logService.deleteSearch(searchId).subscribe(() => {
      this.searches = this.searches.filter((s) => s.id !== searchId);
    });
  }

  getOrderBy(option: number) {
    switch (option) {
      case 0:
        return 'Date DESC';
      case 1:
        return 'Date ASC';
      case 2:
        return 'Score DESC';
      case 3:
        return 'Date ASC';
      default:
        return 'Unknown';
    }
  }

  getException(option: number) {
    switch (option) {
      case 0:
        return 'Any';
      case 1:
        return 'Yes';
      case 2:
        return 'No';
      default:
        return 'Unknown';
    }
  }

  getClasses(rawClasses: string[]) {
    return rawClasses
      .map((x) => x.split(',')[0].split('.').reverse()[0])
      .toString()
      .replaceAll(',', ', ');
  }

  getTarget(option: number) {
    switch (option) {
      case 0:
        return 'Input';
      case 1:
        return 'Output';
      case 2:
        return 'Information';
      default:
        return 'Unknown';
    }
  }

  getOperation(option: number) {
    switch (option) {
      case 0:
        return 'is';
      case 1:
        return 'is not';
      case 2:
        return 'contains';
      case 3:
        return 'not contains';
      case 4:
        return 'like';
      case 5:
        return 'not like';
      default:
        return 'unknown';
    }
  }

  getFilterValue(value: string, operation: number) {
    switch (operation) {
      case 2:
        return value.replaceAll(' ', "' '");
      case 3:
        return value.replaceAll(' ', "' '");
      default:
        return value;
    }
  }
}
