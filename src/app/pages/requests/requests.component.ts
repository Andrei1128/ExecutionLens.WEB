import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
  requestsCountChart: Chart | null = null;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {
    this.createRequestsCountChart();
    this.fetchRequestsCount();
  }

  createRequestsCountChart() {
    this.requestsCountChart = new Chart('requestsCountChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        plugins: {
          title: {
            text: 'Requests Count',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  fetchRequestsCount() {
    this.requestsCountChart?.data.datasets.splice(
      0,
      this.requestsCountChart?.data.datasets.length
    );
    this.requestsCountChart?.data.labels?.splice(
      0,
      this.requestsCountChart?.data.labels?.length
    );

    this.requestsCountChart?.data.labels?.push(
      ...this.requestsCount.map((x) => x.method)
    );

    this.requestsCountChart?.data.datasets.push({
      data: this.requestsCount.map((x) => x.avg),
    });

    this.requestsCountChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  requestsCount = [
    {
      method: 'CalculateMedian',
      avg: 15,
    },
    {
      method: 'ComputeFactorial',
      avg: 10,
    },
    {
      method: 'GeneratePrimeNumbers',

      avg: 75,
    },
    {
      method: 'FindRoot',

      avg: 35,
    },
    {
      method: 'CalculateExponential',

      avg: 50,
    },
    {
      method: 'FindLargestPalindrome',

      avg: 20,
    },
    {
      method: 'CalculateStandardDeviation',

      avg: 12,
    },
  ];
}
