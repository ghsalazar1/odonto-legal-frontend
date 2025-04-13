import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Environment } from '../../environments/environment';
import { PaginatedResponseDTO } from '../models/pagination-response-dto';
import { UserDTO } from '../models/user-model';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = Environment.BackendURL + '/users';  

  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<PaginatedResponseDTO<UserDTO>> {
    return this.http.get<PaginatedResponseDTO<UserDTO>>(this.apiUrl, { params });
  }
}