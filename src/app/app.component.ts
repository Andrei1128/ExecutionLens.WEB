import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, SidebarComponent],
})
export class AppComponent implements OnInit {
  title = 'PostMortem.WEB';

  legendMargin = {
    id: 'legendMargin',
    beforeInit(chart: any, legend: any, options: any) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        this.height += 25;
      };
    },
  };

  ngOnInit() {
    Chart.register(this.legendMargin);
    Chart.defaults.datasets.doughnut.borderColor = 'inherit';
    Chart.defaults.datasets.doughnut.borderWidth = 2;
    Chart.defaults.datasets.doughnut.borderRadius = 5;
    Chart.defaults.datasets.bar.borderWidth = 2;
    Chart.defaults.layout.padding = 10;
    Chart.defaults.borderColor = '#343b4f';
    Chart.defaults.color = '#aeb9e1';
  }
}
