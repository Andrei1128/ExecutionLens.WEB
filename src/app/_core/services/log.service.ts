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
import { ExecutionTime } from '../models/ExecutionTime';
import { NLPSearchResponse } from '../models/NLPSearchResponse';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  uri = 'http://localhost:5000';
  uriReplay = 'https://localhost:7139';

  constructor(private http: HttpClient) {}

  replay(id: string): Observable<null> {
    return this.http.post<null>(`${this.uriReplay}/Replay/${id}`, null);
  }

  getLog(id: string): Observable<Log> {
    return this.http.get<Log>(`${this.uri}/Log/${id}`);
  }

  getClassNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.uri}/Log/GetClassNames`);
  }

  getRequestsCount(filters: GraphFilters): Observable<RequestCount[]> {
    return this.http.post<RequestCount[]>(
      `${this.uri}/Chart/GetRequestsCount`,
      filters
    );
  }

  getMethodNames(classNames: string[]): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.uri}/Log/GetMethodNames`,
      classNames
    );
  }

  getExecutionsTime(filters: GraphFilters): Observable<ExecutionsTime[]> {
    return this.http.post<ExecutionsTime[]>(
      `${this.uri}/Chart/GetExecutionsTimes`,
      filters
    );
  }

  getLogExecutionsTime(id: string): Observable<ExecutionTime[]> {
    return this.http.get<ExecutionTime[]>(
      `${this.uri}/Chart/GetLogExecutionsTime/${id}`
    );
  }

  getExceptionsCount(filters: GraphFilters): Observable<ExceptionsCount[]> {
    return this.http.post<ExceptionsCount[]>(
      `${this.uri}/Chart/GetExceptionsCount`,
      filters
    );
  }

  searchNodes(filters: SearchFilter): Observable<LogOverviewResponse> {
    return this.http.post<LogOverviewResponse>(
      `${this.uri}/Search/SearchNodes`,
      filters
    );
  }

  nlpSearchNodes(textQuery: string): Observable<NLPSearchResponse> {
    return this.http.post<NLPSearchResponse>(
      `${this.uri}/Search/NLPSearchNodes`,
      { textQuery: textQuery }
    );
  }

  getNodeOverview(id: string, needRoot = false): Observable<LogOverview> {
    const params = new HttpParams().set('needRoot', needRoot);
    return this.http.get<LogOverview>(`${this.uri}/Log/OverviewNode/${id}`, {
      params,
    });
  }

  saveSearch(search: SavedSearch): Observable<null> {
    return this.http.post<null>(`${this.uri}/Search/Save`, search);
  }

  getSearches(): Observable<SavedSearch[]> {
    return this.http.get<SavedSearch[]>(`${this.uri}/Search`);
  }

  deleteSearch(id: string): Observable<null> {
    return this.http.delete<null>(`${this.uri}/Search/${id}`);
  }

  exportLogs(filters: SearchFilter): Observable<Blob> {
    return this.http.post(`${this.uri}/Export/Nodes`, filters, {
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
      `${this.uri}/Log/GetMethodExceptions`,
      { params }
    );
  }
}
