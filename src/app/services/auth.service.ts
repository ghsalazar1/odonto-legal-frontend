import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Environment } from '../../environments/environment';
import { UserDTO } from '../models/user-model';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token.service';

interface LoginResponse {
  accessToken: string;
  user: UserDTO
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = Environment.BackendURL + '/auth';  

  constructor(private http: HttpClient,  private tokenService: TokenService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        if (res.accessToken) {
          this.tokenService.Sigin(res?.accessToken, res?.user);
        }
      })
    );
  }

  newUsers(payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: string;
  }): Observable<ResponseDTO<UserDTO>> {
    return this.http.post<ResponseDTO<UserDTO>>(`${this.apiUrl}/new-users`, payload);
  }
  

  logout(): void {
    this.tokenService.SignOut();
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe();
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    const now = Math.floor(Date.now() / 1000);

    return payload && payload.exp && now < payload.exp;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  refreshAccessToken(): Observable<string> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/refresh`,
      {}, // corpo vazio
      { withCredentials: true } // ESSENCIAL para enviar o cookie httpOnly
    ).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
        }
      }),
      map(res => res.accessToken)
    );
  }
  
}
