import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { LogService } from '../../_core/services/log.service';
import { ExceptionsCount } from '../../_core/models/ExceptionsCount';
import { MethodException } from '../../_core/models/MethodException';
import { GraphFilters } from '../../_core/models/GraphFilters';

@Component({
  selector: 'app-exceptions',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatPaginatorModule,
    DateFormatPipe,
    RouterModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './exceptions.component.html',
  styleUrl: './exceptions.component.scss',
})
export class ExceptionsComponent implements OnInit {
  exceptionsCountChart: any | null = null;
  exceptions: MethodException[] = [];
  exceptionsTotalEntries: number = 0;
  exceptionsDetailsMethod: string = 'Latest';
  exceptionsCount: ExceptionsCount[] = [];

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
    this.createExceptionsCountChart();
    this.fetchExceptionsCount();

    this.logService.getMethodExceptions('', '').subscribe((data) => {
      this.exceptions = data.exceptions;
      this.exceptionsTotalEntries = data.totalEntries;
    });
  }

  handlePageEvent(e: PageEvent) {
    let methodName: string =
      this.exceptionsDetailsMethod == 'Latest'
        ? ''
        : this.exceptionsDetailsMethod;
    this.logService
      .getMethodExceptions('', methodName, e.pageIndex)
      .subscribe((data) => {
        this.exceptions = data.exceptions;
        this.exceptionsTotalEntries = data.totalEntries;
      });
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

  createExceptionsCountChart() {
    this.exceptionsCountChart = new Chart('exceptionsCountChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        onHover: (e, item) => {
          (e?.native?.target as HTMLElement).style.cursor =
            item?.length > 0 ? 'pointer' : 'auto';
        },
        onClick: (e, item) => {
          if (item.length > 0) {
            this.exceptionsDetailsMethod =
              this.exceptionsCountChart.data.labels[item[0].index];
            this.logService
              .getMethodExceptions('', this.exceptionsDetailsMethod)
              .subscribe((data) => {
                this.exceptions = data.exceptions;
                this.exceptionsTotalEntries = data.totalEntries;
              });
          }
        },
        plugins: {
          title: {
            text: 'Methods Exception Count',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
        },
      },
    });
  }

  fetchExceptionsCount() {
    const filters: GraphFilters = {
      dateStart: this.filters.controls.dateStart.value,
      dateEnd: this.filters.controls.dateEnd.value,
      controllers: this.filters.controls.controllers.value,
      endpoints: this.filters.controls.endpoints.value,
      isEntryPoint: this.filters.controls.isEntryPoint.value,
    };

    this.logService.getExceptionsCount(filters).subscribe((data) => {
      this.exceptionsCount = data;

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
        data: this.exceptionsCount.map((x) => x.count),
      });

      this.exceptionsCountChart?.update();
    });
  }
}
