import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
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
  selector: 'app-predictions',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss',
})
export class PredictionsComponent implements OnInit {
  requestsPredictionChart: any | null = null;

  filters = new FormGroup({
    interval: new FormControl(),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  ngOnInit() {
    this.createRequestsPredictionChart();
    this.fetchRequestsPredictionCount();
  }

  createRequestsPredictionChart() {
    this.requestsPredictionChart = new Chart('requestsPredictionChart', {
      type: 'line',
      data: {
        datasets: [],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            text: 'Requests Count Prediction',
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
            type: 'time',
            time: {
              unit: 'week',
            },
          },
        },
      },
    });
  }

  fetchRequestsPredictionCount() {
    this.requestsPredictionChart.options.scales.x.time.unit = 'day';

    var points: any[] = [];
    var predictions: any[] = [];

    for (let i = 0; i < 100; i++) {
      points.push({
        x: new Date(
          Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
        ),
        y: Math.floor(Math.random() * 100),
      });
    }

    for (let i = 0; i < 10; i++) {
      predictions.push({
        x: new Date(
          Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
        ),
        y: Math.floor(Math.random() * 100),
      });
    }

    this.requestsPredictionChart?.data.datasets.splice(
      0,
      this.requestsPredictionChart?.data.datasets.length
    );
    this.requestsPredictionChart?.data.labels?.splice(
      0,
      this.requestsPredictionChart?.data.labels?.length
    );

    this.requestsPredictionChart.data.labels = points.map((point) => point.x);
    this.requestsPredictionChart.data.datasets.push({
      label: 'Requests',
      showLine: false,
      fill: false,
      data: points.map((point) => point.y),
    });

    this.requestsPredictionChart.data.labels.push(
      ...predictions.map((point) => point.x)
    );

    this.requestsPredictionChart.data.datasets.push({
      label: 'Predicted',
      data: predictions.map((point) => point.y),
    });

    this.requestsPredictionChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  intervalOptions: string[] = ['day', 'week', 'month'];
}
