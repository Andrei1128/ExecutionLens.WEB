import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LogService } from '../../_core/services/log.service';
import { ExecutionsTime } from '../../_core/models/ExecutionsTime';
import { GraphFilters } from '../../_core/models/GraphFilters';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent implements OnInit {
  methodsExecutionTimeChart: Chart | null = null;
  methodsExecutionTimes: ExecutionsTime[] = [];

  controllerList: string[] = ['none'];
  endpointList: string[] = ['none'];

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl(),
    endpoints: new FormControl(),
    isEntryPoint: new FormControl('Any'),
  });

  isClassNamesLoading: boolean = false;
  isMethodNamesLoading: boolean = false;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.createMethodsExecutionTimeChart();
    this.fetchMethodsExecutionTime();
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

  createMethodsExecutionTimeChart() {
    this.methodsExecutionTimeChart = new Chart('methodsExecutionsTimeChart', {
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
    const filters: GraphFilters = {
      dateStart: this.filters.controls.dateStart.value,
      dateEnd: this.filters.controls.dateEnd.value,
      controllers: this.filters.controls.controllers.value,
      endpoints: this.filters.controls.endpoints.value,
      isEntryPoint: this.filters.controls.isEntryPoint.value,
    };

    this.logService.getExecutionsTime(filters).subscribe((data) => {
      this.methodsExecutionTimes = data;

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
    });
  }
}
