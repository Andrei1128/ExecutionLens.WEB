import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  uri = 'https://localhost:7263/api';

  constructor(private http: HttpClient) {}

  getLog(id: string): Observable<Log> {
    return this.http.get<Log>(`${this.uri}/Logs/${id}`);
  }
}
