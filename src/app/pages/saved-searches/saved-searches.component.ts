import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedSearch } from '../../_core/models/SavedSearch';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-saved-searches',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './saved-searches.component.html',
  styleUrl: './saved-searches.component.scss',
})
export class SavedSearchesComponent implements OnInit {
  searches: SavedSearch[] = [];

  ngOnInit(): void {
    this.searches = [
      {
        Name: 'SavedSearch1',
        SavedAt: new Date(),
        Search: {
          Filters: [
            { Target: 'Name', Operation: 'contains', Value: 'example' },
            { Target: 'Category', Operation: 'equals', Value: 'food' },
          ],
          DateStart: new Date('2024-01-01'),
          DateEnd: new Date('2024-03-31'),
          Controllers: ['UserController', 'ProductController'],
          Endpoints: ['/users', '/products'],
          WithException: false,
          OrderBy: 'createdAt',
          PageSize: 20,
          Id: '1',
        },
      },
      {
        Name: 'SavedSearch2',
        SavedAt: new Date(),
        Search: {
          Filters: [
            { Target: 'Status', Operation: 'equals', Value: 'active' },
            { Target: 'Type', Operation: 'notEquals', Value: 'admin' },
          ],
          DateStart: new Date('2024-02-01'),
          DateEnd: new Date('2024-02-28'),
          Controllers: ['OrderController'],
          Endpoints: ['/orders'],
          WithException: true,
          OrderBy: 'updatedAt',
          PageSize: 10,
          Id: '2',
        },
      },
    ];
  }
}
