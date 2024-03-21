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
  selector: 'app-time',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent implements OnInit {
  endpointsExecutionTimeChart: Chart | null = null;
  methodsExecutionTimeChart: Chart | null = null;

  endpointsFilters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  methodsFilters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {
    this.createEndpointsExecutionTimeChart();
    this.createMethodsExecutionTimeChart();

    this.fetchEndpointsExecutionTime();
    this.fetchMethodsExecutionTime();
  }

  createEndpointsExecutionTimeChart() {
    this.endpointsExecutionTimeChart = new Chart(
      'endpointsExecutionTimeChart',
      {
        type: 'bar',
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          plugins: {
            title: {
              text: 'Endpoints Execution Time',
              display: true,
              font: {
                size: 14,
                style: 'oblique',
              },
              align: 'start',
            },
          },
        },
      }
    );
  }

  createMethodsExecutionTimeChart() {
    this.methodsExecutionTimeChart = new Chart('methodsExecutionTimeChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        plugins: {
          title: {
            text: 'Methods Execution Time',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  fetchMethodsExecutionTime() {
    this.methodsExecutionTimeChart?.data.datasets.splice(
      0,
      this.methodsExecutionTimeChart?.data.datasets.length
    );
    this.methodsExecutionTimeChart?.data.labels?.splice(
      0,
      this.methodsExecutionTimeChart?.data.labels?.length
    );

    this.methodsExecutionTimeChart?.data.labels?.push(
      ...this.methodsExecutionTimes.map((x) => x.method)
    );

    this.methodsExecutionTimeChart?.data.datasets.push({
      label: 'min',
      data: this.methodsExecutionTimes.map((x) => x.min),
    });

    this.methodsExecutionTimeChart?.data.datasets.push({
      label: 'avg',
      data: this.methodsExecutionTimes.map((x) => x.avg),
    });

    this.methodsExecutionTimeChart?.data.datasets.push({
      label: 'max',
      data: this.methodsExecutionTimes.map((x) => x.max),
    });

    this.methodsExecutionTimeChart?.update();
  }

  fetchEndpointsExecutionTime() {
    this.endpointsExecutionTimeChart?.data.datasets.splice(
      0,
      this.endpointsExecutionTimeChart?.data.datasets.length
    );
    this.endpointsExecutionTimeChart?.data.labels?.splice(
      0,
      this.endpointsExecutionTimeChart?.data.labels?.length
    );

    this.endpointsExecutionTimeChart?.data.labels?.push(
      ...this.endpointsExecutionTime.map((x) => x.method)
    );

    this.endpointsExecutionTimeChart?.data.datasets.push({
      label: 'min',
      data: this.endpointsExecutionTime.map((x) => x.min),
    });

    this.endpointsExecutionTimeChart?.data.datasets.push({
      label: 'avg',
      data: this.endpointsExecutionTime.map((x) => x.avg),
    });

    this.endpointsExecutionTimeChart?.data.datasets.push({
      label: 'max',
      data: this.endpointsExecutionTime.map((x) => x.max),
    });

    this.endpointsExecutionTimeChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  endpointsExecutionTime = [
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

  methodsExecutionTimes = [
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
    {
      method: 'GenerateRandomNumber',
      min: 10,
      avg: 25,
      max: 50,
    },
    {
      method: 'SortArray',
      min: 5,
      avg: 15,
      max: 30,
    },
    {
      method: 'ValidateEmail',
      min: 20,
      avg: 40,
      max: 80,
    },
    {
      method: 'CalculateDistance',
      min: 1,
      avg: 10,
      max: 20,
    },
    {
      method: 'EncryptString',
      min: 50,
      avg: 75,
      max: 100,
    },
    {
      method: 'DecryptString',
      min: 15,
      avg: 35,
      max: 60,
    },
    {
      method: 'ConvertToUpperCase',
      min: 25,
      avg: 50,
      max: 100,
    },
    {
      method: 'ConvertToLowerCase',
      min: 10,
      avg: 20,
      max: 40,
    },
    {
      method: 'FindMaximumValue',
      min: 5,
      avg: 12,
      max: 25,
    },
    {
      method: 'FindMinimumValue',
      min: 30,
      avg: 60,
      max: 90,
    },
    {
      method: 'ReverseString',
      min: 2,
      avg: 8,
      max: 15,
    },
    {
      method: 'ShuffleList',
      min: 40,
      avg: 70,
      max: 120,
    },
    {
      method: 'ParseInteger',
      min: 8,
      avg: 20,
      max: 40,
    },
    {
      method: 'MergeArrays',
      min: 12,
      avg: 28,
      max: 50,
    },
    {
      method: 'CheckPalindrome',
      min: 3,
      avg: 18,
      max: 35,
    },
    {
      method: 'GenerateUniqueID',
      min: 60,
      avg: 90,
      max: 150,
    },
    {
      method: 'RemoveDuplicates',
      min: 18,
      avg: 45,
      max: 80,
    },
    {
      method: 'ValidatePasswordStrength',
      min: 6,
      avg: 25,
      max: 45,
    },
    {
      method: 'FormatDateTime',
      min: 35,
      avg: 55,
      max: 100,
    },
    {
      method: 'CalculateAverage',
      min: 7,
      avg: 22,
      max: 38,
    },
  ];
}
