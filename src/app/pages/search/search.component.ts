import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../_core/pipes/DateFormatPipe';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Filter, SearchFilter } from '../../_core/models/SearchFilter';
import { LogOverview } from '../../_core/models/LogOverview';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { LogService } from '../../_core/services/log.service';
import { SavedSearch } from '../../_core/models/SavedSearch';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../_core/services/data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    NgFor,
    NgIf,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    MatChipsModule,
    DateFormatPipe,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
})
export class SearchComponent implements OnInit {
  requestsCountChart: Chart | null = null;
  emptySearch: boolean = true;
  searchByIdActive: boolean = false;
  @ViewChild('saveSearchDialog') saveSearchDialog: TemplateRef<any> | undefined;
  searchBar: FormControl<string | null> = new FormControl('');
  searchFilterName: FormControl<string | null> = new FormControl(null);
  radioButtonGroup = new FormControl();
  logs: LogOverview[] = [];
  logsTotalEntries: number = 0;
  pageIndex: number = 0;
  pageSize: number = 12;

  controllerList: string[] = ['none'];
  endpointList: string[] = ['none'];

  isClassNamesLoading: boolean = false;
  isMethodNamesLoading: boolean = false;

  advancedFilters: Filter[] = [];
  currentSearch: SearchFilter | null = null;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl<string[] | null>(null),
    endpoints: new FormControl<string[] | null>(null),
    hasException: new FormControl<string | null>('Any'),
    orderBy: new FormControl<string | null>('Date Descending'),
    pageSize: new FormControl<number | null>(12),

    searchId: new FormControl<string | null>(null),
  });

  constructor(
    private dialog: MatDialog,
    private logService: LogService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const savedSearch = this.dataService.getData();
    if (savedSearch != null) {
      this.dataService.setData(null);

      this.advancedFilters = savedSearch.filters ?? [];

      this.filters.patchValue({
        dateStart: savedSearch.dateStart,
        dateEnd: savedSearch.dateEnd,
        controllers: savedSearch.controllers,
        endpoints: savedSearch.endpoints,
        hasException: savedSearch.hasException,
        orderBy: savedSearch.orderBy,
        pageSize: savedSearch.pageSize,
        searchId: savedSearch.id,
      });

      this.fetch();
    }

    this.searchBar.valueChanges.subscribe((value: string | null) => {
      this.emptySearch = value?.trim().length === 0;
    });

    this.filters
      .get('searchId')
      ?.valueChanges.subscribe((value: string | null) => {
        this.searchByIdActive = value!.trim().length > 0;
        if (this.searchByIdActive) {
          this.searchBar.disable();
          this.filters.controls.controllers.disable();
          this.filters.controls.endpoints.disable();
          this.filters.controls.dateStart.disable();
          this.filters.controls.dateEnd.disable();
          this.filters.controls.hasException.disable();
          this.filters.controls.orderBy.disable();
          this.filters.controls.pageSize.disable();
        } else {
          this.searchBar.enable();
          this.filters.controls.controllers.enable();
          this.filters.controls.endpoints.enable();
          this.filters.controls.dateStart.enable();
          this.filters.controls.dateEnd.enable();
          this.filters.controls.hasException.enable();
          this.filters.controls.orderBy.enable();
          this.filters.controls.pageSize.enable();
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.fetch(e.pageIndex);
  }

  addAdvancedFilter() {
    const searchValue = this.searchBar.value;
    const operation = this.radioButtonGroup.value;

    if (
      searchValue != null &&
      searchValue.trim().length > 0 &&
      operation != null
    ) {
      const filter = operation.split(' ');

      this.advancedFilters.push({
        target: filter[0],
        operation: filter[1].replace('_', ' '),
        value: searchValue,
      });

      this.radioButtonGroup.reset();
      this.searchBar.setValue('');
      this.emptySearch = true;
    }
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

  removeAdvancedFilter(filter: Filter) {
    this.advancedFilters.splice(this.advancedFilters.indexOf(filter), 1);
  }

  openDialog() {
    this.dialog.open(this.saveSearchDialog!, {
      height: '250px',
      width: '400px',
      disableClose: true,
    });
  }

  closeDialog(flag: boolean) {
    if (flag == true) {
      const searchFilterName = this.searchFilterName.value;

      if (searchFilterName != null && searchFilterName.trim().length > 0) {
        const searchToSave: SavedSearch = {
          id: null,
          name: searchFilterName,
          savedAt: null,
          search: this.currentSearch!,
        };

        this.logService.saveSearch(searchToSave).subscribe(() => {});

        this.dialog.closeAll();
      } else return;
    } else {
      this.searchFilterName.setValue(null);

      this.dialog.closeAll();
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  exportData() {
    this.logService
      .exportLogs(this.currentSearch!)
      .subscribe((data) => saveAs(data, `export.json`));
  }

  fetch(pageNo: number = 0) {
    this.pageIndex = pageNo;

    const filter = this.filters.value;

    if (filter.searchId != null && filter.searchId.trim().length > 0) {
      this.currentSearch = {
        filters: null,
        dateStart: null,
        dateEnd: null,
        controllers: null,
        endpoints: null,
        hasException: null,
        orderBy: null,
        pageSize: null,
        pageNo: null,
        id: filter.searchId,
      };

      this.logService.searchNodeById(filter.searchId).subscribe((data) => {
        if (data == null) {
          this.logs = [];
          return;
        }

        this.logs = [data];
        this.logsTotalEntries = this.logs.length;
      });
    } else {
      if (filter.pageSize == null || filter.pageSize < 1) {
        this.filters.controls.pageSize.setValue(12);
        filter.pageSize = 12;
      }

      this.currentSearch = {
        filters: this.advancedFilters,
        dateStart: filter.dateStart!,
        dateEnd: filter.dateEnd!,
        controllers: filter.controllers!,
        endpoints: filter.endpoints!,
        hasException: filter.hasException!,
        orderBy: filter.orderBy!,
        pageSize: filter.pageSize ?? 12,
        pageNo: pageNo,
        id: null,
      };
      this.pageSize = this.currentSearch.pageSize!;

      this.logService.searchNodes(this.currentSearch).subscribe((data) => {
        this.logs = data?.nodes ?? [];
        this.logsTotalEntries = data?.totalEntries ?? 0;
        console.log(this.logsTotalEntries);
      });
    }
  }

  orderOptions: string[] = [
    'Date Ascending',
    'Date Descending',
    'Score Ascending',
    'Score Descending',
  ];
}
