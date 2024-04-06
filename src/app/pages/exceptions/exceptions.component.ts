import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Exception } from '../../_core/models/Exception';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-exceptions',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatPaginatorModule,
    DateFormatPipe,
    RouterModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './exceptions.component.html',
  styleUrl: './exceptions.component.scss',
})
export class ExceptionsComponent implements OnInit {
  exceptionsCountChart: any | null = null;
  exceptions: Exception[] = [];
  exceptionsDetailsMethod: string | null = null;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {
    this.createExceptionsCountChart();
    this.fetchExceptionsCount();

    this.exceptions = [
      {
        LogId: '1asd345t123asd',
        Method: 'SavedSearch1',
        OccuredAt: new Date(),
        StackTrace: 'Error: Cannot read property "id" of undefined',
      },
      {
        LogId: '1asd345t123asd',
        Method: 'SavedSearch2',
        OccuredAt: new Date(),
        StackTrace: 'Error: Cannot read property "id" of undefined',
      },
    ];
  }

  createExceptionsCountChart() {
    this.exceptionsCountChart = new Chart('exceptionsCountChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        onHover: (e, item) => {
          (e?.native?.target as HTMLElement).style.cursor =
            item?.length > 0 ? 'pointer' : 'auto';
        },
        onClick: (e, item) => {
          if (item.length > 0) {
            this.exceptionsDetailsMethod =
              this.exceptionsCountChart.data.labels[item[0].index];
          }
        },
        plugins: {
          title: {
            text: 'Methods Exception Count',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
        },
      },
    });
  }

  fetchExceptionsCount() {
    this.exceptionsCountChart?.data.datasets.splice(
      0,
      this.exceptionsCountChart?.data.datasets.length
    );
    this.exceptionsCountChart?.data.labels?.splice(
      0,
      this.exceptionsCountChart?.data.labels?.length
    );

    this.exceptionsCountChart?.data.labels?.push(
      ...this.exceptionsCount.map((x) => x.method)
    );

    this.exceptionsCountChart?.data.datasets.push({
      data: this.exceptionsCount.map((x) => x.value),
    });

    this.exceptionsCountChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  exceptionsCount = [
    {
      method: 'CalculateMedian',
      value: 15,
    },
    {
      method: 'ComputeFactorial',
      value: 10,
    },
    {
      method: 'GeneratePrimeNumbers',
      value: 75,
    },
    {
      method: 'FindRoot',
      value: 35,
    },
    {
      method: 'CalculateExponential',
      value: 50,
    },
    {
      method: 'FindLargestPalindrome',
      value: 20,
    },
    {
      method: 'CalculateStandardDeviation',
      value: 12,
    },
  ];
}
