import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent implements OnInit {
  xValues = [
    'Italy',
    'France',
    'Spain',
    'USA',
    'Argentina',
    'Italy',
    'France',
    'Spain',
    'USA',
    'Argentina',
    'Italy',
    'France',
    'Spain',
    'USA',
    'Argentina',
    'Italy',
    'France',
    'Spain',
    'USA',
    'Argentina',
  ];
  yValues = [
    55, 49, 44, 24, 15, 55, 49, 44, 24, 15, 55, 49, 44, 24, 15, 55, 49, 44, 24,
    15,
  ];

  methodsExecutionTimeChart: Chart | null = null;
  endpointsExecutionTimeChart: any | null = null;

  ngOnInit() {
    this.methodsExecutionTimeChart = new Chart('methodsExecutionTimeChart', {
      type: 'bar',
      data: {
        labels: this.xValues,
        datasets: [
          {
            label: 'min',
            data: this.yValues,
          },
          {
            label: 'avg',
            data: this.yValues,
          },
          {
            label: 'max',
            data: this.yValues,
          },
        ],
      },
    });

    this.endpointsExecutionTimeChart = new Chart(
      'endpointsExecutionTimeChart',
      {
        type: 'doughnut',
        data: {
          labels: this.xValues,
          datasets: [
            {
              data: this.yValues,
            },
            {
              data: this.yValues,
            },
            {
              data: this.yValues,
            },
          ],
        },
      }
    );
  }
}
