import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/Log';
import { RequestCount } from '../models/RequestCount';
import { ExecutionsTime } from '../models/ExecutionsTime';
import { ExceptionsCount } from '../models/ExceptionsCount';
import {
  MethodException,
  MethodExceptionsResponse,
} from '../models/MethodException';
import { GraphFilters } from '../models/GraphFilters';
import { SearchFilter } from '../models/SearchFilter';
import { LogOverview } from '../models/LogOverview';
import { SavedSearch } from '../models/SavedSearch';
import { LogOverviewResponse } from '../models/LogOverviewResponse';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  uri = 'http://localhost:5000';
  uriReplay = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  replay(id: string): Observable<null> {
    return this.http.post<null>(`${this.uriReplay}/Replay`, id);
  }

  getLog(id: string): Observable<Log> {
    return this.http.get<Log>(`${this.uri}/logs/${id}`);
  }

  getClassNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.uri}/logs/GetClassNames`);
  }

  getRequestsCount(filters: GraphFilters): Observable<RequestCount[]> {
    return this.http.post<RequestCount[]>(
      `${this.uri}/logs/GetRequestsCount`,
      filters
    );
  }

  getMethodNames(classNames: string[]): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.uri}/logs/GetMethodNames`,
      classNames
    );
  }

  getExecutionsTime(filters: GraphFilters): Observable<ExecutionsTime[]> {
    return this.http.post<ExecutionsTime[]>(
      `${this.uri}/logs/GetExecutionTimes`,
      filters
    );
  }

  getExceptionsCount(filters: GraphFilters): Observable<ExceptionsCount[]> {
    return this.http.post<ExceptionsCount[]>(
      `${this.uri}/logs/GetExceptionsCount`,
      filters
    );
  }

  searchNodes(filters: SearchFilter): Observable<LogOverviewResponse> {
    return this.http.post<LogOverviewResponse>(
      `${this.uri}/logs/Search`,
      filters
    );
  }

  searchNodeById(id: string): Observable<LogOverview> {
    return this.http.get<LogOverview>(`${this.uri}/logs/Search/${id}`);
  }

  saveSearch(search: SavedSearch): Observable<null> {
    return this.http.post<null>(`${this.uri}/search`, search);
  }

  getSearches(): Observable<SavedSearch[]> {
    return this.http.get<SavedSearch[]>(`${this.uri}/search`);
  }

  deleteSearch(id: string): Observable<null> {
    return this.http.delete<null>(`${this.uri}/search/${id}`);
  }

  exportLogs(filters: SearchFilter): Observable<Blob> {
    return this.http.post(`${this.uri}/logs/Export`, filters, {
      responseType: 'blob',
    });
  }

  getMethodExceptions(
    className: string,
    methodName: string,
    page: number = 0
  ): Observable<MethodExceptionsResponse> {
    const params = new HttpParams()
      .set('class', className)
      .set('name', methodName)
      .set('page', page.toString());

    return this.http.get<MethodExceptionsResponse>(
      `${this.uri}/logs/GetMethodExceptions`,
      { params }
    );
  }
}
