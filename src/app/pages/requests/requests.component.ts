import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../_core/modules/shared.module';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
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
      label: 'min',
      data: this.requestsCount.map((x) => x.min),
    });

    this.requestsCountChart?.data.datasets.push({
      label: 'avg',
      data: this.requestsCount.map((x) => x.avg),
    });

    this.requestsCountChart?.data.datasets.push({
      label: 'max',
      data: this.requestsCount.map((x) => x.max),
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
      min: 5,
      avg: 15,
      max: 30,
    },
    {
      method: 'ComputeFactorial',
      min: 1,
      avg: 10,
      max: 20,
    },
    {
      method: 'GeneratePrimeNumbers',
      min: 50,
      avg: 75,
      max: 100,
    },
    {
      method: 'FindRoot',
      min: 15,
      avg: 35,
      max: 60,
    },
    {
      method: 'CalculateExponential',
      min: 25,
      avg: 50,
      max: 100,
    },
    {
      method: 'FindLargestPalindrome',
      min: 10,
      avg: 20,
      max: 40,
    },
    {
      method: 'CalculateStandardDeviation',
      min: 5,
      avg: 12,
      max: 25,
    },
  ];
}
