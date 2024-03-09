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

  ngOnInit() {
    Chart.defaults.layout.padding = 10;
    Chart.defaults.borderColor = '#343b4f';
    Chart.defaults.color = '#aeb9e1';
  }
}
