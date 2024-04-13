import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Filter } from '../../_core/models/SearchFilter';
import { LogOverview } from '../../_core/models/LogOverview';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    MatChipsModule,
    DateFormatPipe,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
})
export class SearchComponent implements OnInit {
  requestsCountChart: Chart | null = null;
  emptySearch: boolean = true;
  searchByIdActive: boolean = false;
  @ViewChild('saveSearchDialog') saveSearchDialog: TemplateRef<any> | undefined;
  searchBar: FormControl<string | null> = new FormControl(null);
  searchFilterName: FormControl<string | null> = new FormControl(null);
  radioButtonGroup = new FormControl();
  advancedFilters: Filter[] = [];
  logs: LogOverview[] = [];

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
    searchId: new FormControl(),
  });

  constructor(public dialog: MatDialog) {}

  addAdvancedFilter() {
    const searchValue = this.searchBar.value;
    const operation = this.radioButtonGroup.value;

    if (
      searchValue != null &&
      searchValue.trim().length > 0 &&
      operation != null
    ) {
      const filter = operation.split(' ');

      this.advancedFilters.push({
        Target: filter[0],
        Operation: filter[1],
        Value: searchValue,
      });

      this.searchBar.setValue(null);
      this.emptySearch = true;
    }
  }

  removeAdvancedFilter(filter: Filter) {
    this.advancedFilters.splice(this.advancedFilters.indexOf(filter), 1);
  }

  openDialog() {
    this.dialog.open(this.saveSearchDialog!, {
      height: '250px',
      width: '400px',
      disableClose: true,
    });
  }

  closeDialog(flag: boolean) {
    if (flag == true) {
      const searchFilterName = this.searchFilterName.value;

      if (searchFilterName != null && searchFilterName.trim().length > 0) {
        // Save search filter

        this.dialog.closeAll();
      } else return;
    } else {
      this.searchFilterName.setValue(null);

      this.dialog.closeAll();
    }
  }

  ngOnInit() {
    this.searchBar.valueChanges.subscribe((value: string | null) => {
      this.emptySearch = value?.trim().length === 0;
    });

    this.filters.get('searchId')?.valueChanges.subscribe((value: string) => {
      this.searchByIdActive = value.trim().length > 0;
    });

    this.logs = [
      {
        Id: '1asd345t123asd',
        Controller: 'UserController',
        Endpoint: '/product',
        HasException: true,
        EntryTime: new Date(),
        ExitTime: new Date(),
        Duration: '00:00:23:123135123Z',
      },
      {
        Id: '1asd345t123asd',
        Controller: 'PaymentController',
        Endpoint: '/payment',
        HasException: false,
        EntryTime: new Date(),
        ExitTime: new Date(),
        Duration: '00:00:23:123135123Z',
      },
    ];
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  fetch() {}

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  orderOptions: any[] = [
    { value: 0, viewValue: 'Date ASC' },
    { value: 1, viewValue: 'Date DESC' },
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];
}
