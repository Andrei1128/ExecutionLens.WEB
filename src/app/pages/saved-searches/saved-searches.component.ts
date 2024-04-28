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
      console.log(searches);
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
}
