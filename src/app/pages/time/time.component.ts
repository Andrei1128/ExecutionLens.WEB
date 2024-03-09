import { Component, HostListener, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent implements OnInit {
  chart: Chart | null = null;

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.chart) {
      this.chart.resize();
    }
  }
}
