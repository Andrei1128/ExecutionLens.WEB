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
  xValues = ['Italy', 'France', 'Spain', 'USA', 'Argentina'];
  yValues = [55, 49, 44, 24, 15];

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
            borderWidth: 2,
          },
          {
            label: 'avg',
            data: this.yValues,
            borderWidth: 2,
          },
          {
            label: 'max',
            data: this.yValues,
            borderWidth: 2,
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
          ],
        },
        options: {
          animation: {
            duration: 1000,
          },
        },
      }
    );
  }
}
