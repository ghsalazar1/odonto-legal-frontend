import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private readonly apiUrl = Environment.BackendURL + '/dashboards';

  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }
}
