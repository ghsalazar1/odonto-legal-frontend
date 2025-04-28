import { Injectable } from "@angular/core";
import { Environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseDTO } from "../shared/models/response-dto";
import { ReportDTO } from "../shared/models/reports-model";

@Injectable({ providedIn: 'root' })
export class ReportsService {


  private readonly apiUrl = Environment.BackendURL + '/reports';  

  constructor(private http: HttpClient) {}

  getAll() : Observable<ResponseDTO<ReportDTO[]>> {
    return this.http.get<ResponseDTO<ReportDTO[]>>(`${this.apiUrl}`);
  }

}