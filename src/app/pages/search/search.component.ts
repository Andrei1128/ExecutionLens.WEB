import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../_core/modules/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
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

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    SharedModule,
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
  ],
})
export class SearchComponent implements OnInit {
  requestsCountChart: Chart | null = null;
  searchAccordionFocus: boolean = false;
  searchInputFocus: boolean = false;
  emptySearch: boolean = true;
  searchByIdActive: boolean = false;

  @ViewChild('saveSearchDialog') saveSearchDialog: TemplateRef<any> | undefined;
  searchFilterName: FormControl<string | null> = new FormControl(null);

  logs: any[] = [];

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    search: new FormControl(),
    controllers: new FormControl(),
    endpoints: new FormControl(),
    searchId: new FormControl(),
  });

  constructor(public dialog: MatDialog) {}

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
    this.filters.get('search')?.valueChanges.subscribe((value: string) => {
      this.emptySearch = value.trim().length === 0;
    });

    this.filters.get('searchId')?.valueChanges.subscribe((value: string) => {
      this.searchByIdActive = value.trim().length > 0;
    });

    this.logs = [
      {
        LogId: '1asd345t123asd',
        Controller: 'UserController',
        Endpoint: '/product',
        HasException: true,
        CalledAt: new Date(),
        EndedAt: new Date(),
        Duration: '00:00:23:123135123Z',
      },
      {
        LogId: '1asd345t123asd',
        Controller: 'PaymentController',
        Endpoint: '/payment',
        HasException: false,
        CalledAt: new Date(),
        EndedAt: new Date(),
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
    { value: 0, viewValue: 'ASC' },
    { value: 1, viewValue: 'DESC' },
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];
}
