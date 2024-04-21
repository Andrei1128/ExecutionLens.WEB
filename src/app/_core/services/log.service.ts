import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/Log';
import { RequestCount } from '../models/RequestCount';
import { ExecutionsTime } from '../models/ExecutionsTime';
import { ExceptionsCount } from '../models/ExceptionsCount';
import { MethodException } from '../models/MethodException';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  uri = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getLog(id: string): Observable<Log> {
    return this.http.get<Log>(`${this.uri}/logs/${id}`);
  }

  getClassNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.uri}/logs/GetClassNames`);
  }

  getRequestsCount(): Observable<RequestCount[]> {
    return this.http.get<RequestCount[]>(`${this.uri}/logs/GetRequestsCount`);
  }

  getMethodNames(classNames: string[]): Observable<string[]> {
    return this.http.post<string[]>(
      `${this.uri}/logs/GetMethodNames`,
      classNames
    );
  }

  getExecutionsTime(): Observable<ExecutionsTime[]> {
    return this.http.get<ExecutionsTime[]>(
      `${this.uri}/logs/GetExecutionTimes`
    );
  }

  getExceptionsCount(): Observable<ExceptionsCount[]> {
    return this.http.get<ExceptionsCount[]>(
      `${this.uri}/logs/GetExceptionsCount`
    );
  }

  getMethodExceptions(
    className: string,
    methodName: string
  ): Observable<MethodException[]> {
    const params = new HttpParams()
      .set('class', className)
      .set('name', methodName);

    return this.http.get<MethodException[]>(
      `${this.uri}/logs/GetMethodExceptions`,
      { params }
    );
  }
}
