import { Injectable } from "@angular/core";
import { Environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ResponseDTO } from "../models/response-dto";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CasesService {
  
  private readonly apiUrl = Environment.BackendURL + '/cases';  

  constructor(private http: HttpClient) {}

  create(data: FormData): Observable<ResponseDTO<any>> {
    return this.http.post<ResponseDTO<any>>(`${this.apiUrl}`, data);
  }
}