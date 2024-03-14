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
  selector: 'app-exceptions',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exceptions.component.html',
  styleUrl: './exceptions.component.scss',
})
export class ExceptionsComponent implements OnInit {
  exceptionsCountChart: any | null = null;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {
    this.createExceptionsCountChart();
    this.fetchExceptionsCount();
  }

  createExceptionsCountChart() {
    this.exceptionsCountChart = new Chart('exceptionsCountChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
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
