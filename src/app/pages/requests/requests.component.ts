import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { LogService } from '../../_core/services/log.service';
import { RequestCount } from '../../_core/models/RequestCount';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
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
  requestsCount: RequestCount[] = [];

  controllerList: string[] = ['none'];
  endpointList: string[] = ['none'];

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
  });

  isClassNamesLoading: boolean = false;
  isMethodNamesLoading: boolean = false;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.createRequestsCountChart();
    this.fetchRequestsCount();
  }

  getClassNames() {
    this.isClassNamesLoading = true;
    this.logService.getClassNames().subscribe((data) => {
      this.filters.controls.endpoints.reset();
      this.controllerList = data;
      this.isClassNamesLoading = false;
    });
  }

  getMethodNames() {
    this.isMethodNamesLoading = true;
    const classNames = this.filters.controls.controllers.value ?? [];
    this.logService.getMethodNames(classNames).subscribe((data) => {
      this.endpointList = data;
      this.isMethodNamesLoading = false;
    });
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
    this.logService.getRequestsCount().subscribe((data) => {
      this.requestsCount = data;
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
        data: this.requestsCount.map((x) => x.count),
      });

      this.requestsCountChart?.update();
    });
  }
}
