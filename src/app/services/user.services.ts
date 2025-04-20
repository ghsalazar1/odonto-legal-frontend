import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { UserDTO } from '../models/user-model';
import { RoleDTO } from '../models/role-model';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly apiUrl = Environment.BackendURL + '/users';  

  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<ResponseDTO<UserDTO[]>> {
    return this.http.get<ResponseDTO<UserDTO[]>>(this.apiUrl, { params });
  }

  getAll(): Observable<ResponseDTO<UserDTO[]>> {
    return this.http.get<ResponseDTO<UserDTO[]>>(this.apiUrl, { });
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  getUserById(id: string): Observable<ResponseDTO<UserDTO>> {
    return this.http.get<ResponseDTO<UserDTO>>(`${this.apiUrl}/${id}`);
  }
  
  updateUser(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
  
  add(payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: string;
  }): Observable<ResponseDTO<UserDTO>> {
    return this.http.post<ResponseDTO<UserDTO>>(`${this.apiUrl}`, payload);
  }
  
  getRoles(): Observable<RoleDTO[]> {
    const roles: RoleDTO[] = [
      { id: '1', description: 'Administrador' },
      { id: '2', description: 'Perito' },
      { id: '3', description: 'Assistente' }
    ];
    return of(roles);
  }
}