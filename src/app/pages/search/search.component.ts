import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../_core/modules/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  requestsCountChart: Chart | null = null;
  searchAccordionFocus: boolean = false;
  searchInputFocus: boolean = false;
  emptySearch: boolean = true;
  searchById: boolean = false;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {}

  fetch() {}

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  orderOptions: any[] = [
    { value: 0, viewValue: 'ASC' },
    { value: 1, viewValue: 'DESC' },
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];
}
