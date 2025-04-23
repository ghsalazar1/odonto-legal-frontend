import { Injectable } from "@angular/core";
import { Environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ResponseDTO } from "../models/response-dto";
import { Observable } from "rxjs";
import { CaseDTO, FullCaseDTO } from "../models/case-model";

@Injectable({ providedIn: 'root' })
export class CasesService {

  private readonly apiUrl = Environment.BackendURL + '/cases';  

  constructor(private http: HttpClient) {}

  create(data: FormData): Observable<ResponseDTO<any>> {
    return this.http.post<ResponseDTO<any>>(`${this.apiUrl}`, data);
  }

  fetch(page: number, limit: number, search: string = ''): Observable<ResponseDTO<CaseDTO[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<ResponseDTO<CaseDTO[]>>(this.apiUrl, { params });
  }

  finalize(id: string, payload: { summary: any; notes: any; }) : Observable<ResponseDTO<CaseDTO>> {
    return this.http.put<ResponseDTO<CaseDTO>>(`${this.apiUrl}/${id}/finalize`, payload);
  }  

  archive(id: string, payload: { reason: any; }) : Observable<ResponseDTO<CaseDTO>> {
    return this.http.put<ResponseDTO<CaseDTO>>(`${this.apiUrl}/${id}/archive`, payload);
  }  

  delete(caseId: string) {
    return this.http.delete(`${this.apiUrl}/${caseId}`);
  }

  update(id: string, data: FormData): Observable<ResponseDTO<CaseDTO>> {
    return this.http.put<ResponseDTO<CaseDTO>>(`${this.apiUrl}/${id}`, data);
  }

  getById(id: string): Observable<ResponseDTO<FullCaseDTO>> {
    return this.http.get<ResponseDTO<FullCaseDTO>>(`${this.apiUrl}/${id}`);
  }


}