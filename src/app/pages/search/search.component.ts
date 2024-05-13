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
import { BinaryChoice } from '../../_core/consts/BinaryChoice';
import { OrderByChoices } from '../../_core/consts/OrderBy';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
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
  searchByNLPActive: boolean = false;
  @ViewChild('saveSearchDialog') saveSearchDialog: TemplateRef<any> | undefined;
  searchBar: FormControl<string | null> = new FormControl('');
  nlpSearchBar: FormControl<string | null> = new FormControl('');
  searchFilterName: FormControl<string | null> = new FormControl(null);
  radioButtonGroup = new FormControl();
  logs: LogOverview[] = [];
  logsTotalEntries: number = 0;
  pageIndex: number = 0;
  pageSize: number = 12;

  hasExceptionChoices = BinaryChoice;

  isFetching: boolean = false;
  isExporting: boolean = false;

  controllerList: string[] = ['none'];
  endpointList: string[] = ['none'];

  isClassNamesLoading: boolean = false;
  isMethodNamesLoading: boolean = false;

  orderByChoices = OrderByChoices;

  advancedFilters: Filter[] = [];
  currentSearch: SearchFilter | null = null;

  filters = new FormGroup({
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
    controllers: new FormControl<string[] | null>(null),
    endpoints: new FormControl<string[] | null>(null),
    hasException: new FormControl<number>(0),
    orderBy: new FormControl<number>(0),
    pageSize: new FormControl<number | null>(12),

    searchId: new FormControl<string | null>(null),
  });

  constructor(
    private dialog: MatDialog,
    private logService: LogService,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const savedSearch = this.dataService.getData();
    if (savedSearch != null) {
      this.dataService.setData(null);

      this.advancedFilters = savedSearch.filters ?? [];

      this.filters.patchValue({
        dateStart: savedSearch.dateStart,
        dateEnd: savedSearch.dateEnd,
        controllers: savedSearch.classes,
        endpoints: savedSearch.methods,
        hasException: savedSearch.hasException,
        orderBy: savedSearch.orderBy,
        pageSize: savedSearch.pageSize,
        searchId: savedSearch.id,
      });

      if (savedSearch.id != null && savedSearch.id.trim().length > 0) {
        this.searchByIdActive = true;
        this.triggerControllsToggle();
      }

      this.fetch();
    }

    this.searchBar.valueChanges.subscribe((value: string | null) => {
      this.emptySearch = value?.trim().length === 0;
    });

    this.filters.controls.searchId.valueChanges.subscribe(
      (value: string | null) => {
        if (this.filters.controls.searchId.enabled) {
          if (value == null || value.trim().length == 0) {
            this.searchByIdActive = false;
            if (!this.nlpSearchBar.enabled) this.nlpSearchBar.enable();
          } else {
            this.nlpSearchBar.disable();
            this.searchByIdActive = true;
          }
        }
        this.triggerControllsToggle();
      }
    );

    this.nlpSearchBar.valueChanges.subscribe((value: string | null) => {
      if (this.nlpSearchBar.enabled) {
        if (value == null || value.trim().length == 0) {
          this.searchByNLPActive = false;
          if (!this.filters.controls.searchId.enabled)
            this.filters.controls.searchId.enable();
        } else {
          this.searchByNLPActive = true;
          this.filters.controls.searchId.disable();
        }
      }
      this.triggerControllsToggle();
    });
  }

  triggerControllsToggle() {
    if (this.searchByIdActive || this.searchByNLPActive) {
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
  }
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.fetch(e.pageIndex, true);
  }

  addAdvancedFilter() {
    const searchValue = this.searchBar.value;
    const operation = this.radioButtonGroup.value;

    if (
      searchValue != null &&
      searchValue.trim().length > 0 &&
      operation != null
    ) {
      const filter = operation.split('');

      this.advancedFilters.push({
        target: Number.parseInt(filter[0]),
        operation: Number.parseInt(filter[1]),
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

        this.logService.saveSearch(searchToSave).subscribe({
          next: (data) => {
            this.searchFilterName.setValue(null);
          },
          error: (error) => {},
        });

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
    this.isExporting = true;

    this.logService.exportLogs(this.currentSearch!).subscribe({
      next: (data) => {
        saveAs(data, `export.json`);
        setTimeout(() => {
          this.isExporting = false;
        }, 100);
      },
      error: (error) => {
        this.isExporting = false;
      },
    });
  }

  fetch(pageNo: number = 0, ignoreNLP: boolean = false) {
    this.isFetching = true;
    this.pageIndex = pageNo;

    const filter = this.filters.value;

    const nlpQuery = this.nlpSearchBar.value;
    if (!ignoreNLP && nlpQuery != null && nlpQuery.trim().length > 0) {
      this.logService.nlpSearchNodes(nlpQuery).subscribe({
        next: (data) => {
          this.isFetching = false;

          if (data.error != null) {
            this._snackBar.open(data.error, 'Close', {
              duration: 7000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return;
          }

          this.currentSearch = data?.filters;
          this.advancedFilters = this.currentSearch.filters ?? [];
          this.filters.patchValue({
            dateStart: this.currentSearch.dateStart,
            dateEnd: this.currentSearch.dateEnd,
            controllers: this.currentSearch.classes,
            endpoints: this.currentSearch.methods,
            hasException: this.currentSearch.hasException,
            orderBy: this.currentSearch.orderBy,
            pageSize: this.currentSearch.pageSize,
            searchId: this.currentSearch.id,
          });

          this.logs = data?.result.nodes ?? [];
          this.logsTotalEntries = data?.result.totalEntries ?? 0;
        },
        error: (error) => {
          this.isFetching = false;
        },
      });
    } else if (filter.searchId != null && filter.searchId.trim().length > 0) {
      this.currentSearch = {
        filters: null,
        dateStart: null,
        dateEnd: null,
        classes: null,
        methods: null,
        hasException: 0,
        orderBy: 0,
        pageSize: null,
        pageNo: null,
        id: filter.searchId,
      };

      this.logService.getNodeOverview(filter.searchId).subscribe({
        next: (data) => {
          setTimeout(() => {
            this.isFetching = false;
          }, 100);

          if (data == null) {
            this.logs = [];
            return;
          } else {
            this.logs = [data];
            this.logsTotalEntries = this.logs.length;
          }
        },
        error: (error) => {
          this.isFetching = false;
        },
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
        classes: filter.controllers!,
        methods: filter.endpoints!,
        hasException: filter.hasException!,
        orderBy: filter.orderBy!,
        pageSize: filter.pageSize ?? 12,
        pageNo: pageNo,
        id: null,
      };
      this.pageSize = this.currentSearch.pageSize!;

      this.logService.searchNodes(this.currentSearch).subscribe({
        next: (data) => {
          this.logs = data?.nodes ?? [];
          this.logsTotalEntries = data?.totalEntries ?? 0;

          setTimeout(() => {
            this.isFetching = false;
          }, 100);
        },
        error: (error) => {
          this.isFetching = false;
        },
      });
    }
  }

  getTarget(option: number) {
    switch (option) {
      case 0:
        return 'Input';
      case 1:
        return 'Output';
      case 2:
        return 'Information';
      default:
        return 'Unknown';
    }
  }

  getOperation(option: number) {
    switch (option) {
      case 0:
        return 'equals';
      case 1:
        return 'equals not';
      case 2:
        return 'contains';
      case 3:
        return 'contains not';
      case 4:
        return 'matches';
      case 5:
        return 'matches not';
      default:
        return 'unknown';
    }
  }

  getFilterValue(value: string, operation: number) {
    switch (operation) {
      case 2:
        return value.replaceAll(' ', "' '");
      case 3:
        return value.replaceAll(' ', "' '");
      default:
        return value;
    }
  }
}
