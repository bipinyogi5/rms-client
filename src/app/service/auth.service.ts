import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameSubject = new BehaviorSubject<string>('');

  private openLoginModalSource = new Subject<void>();
  openLoginModal$ = this.openLoginModalSource.asObservable();

  constructor(private http: HttpClient) { }

  get username$() {
    return this.usernameSubject.asObservable();
  }

  openLoginModal() { 
    this.openLoginModalSource.next();
    console.log('Open login modal');
  }

  userLogin(data: object) {
    let url = `${environment.base_url}users/login`;
    return this.http.post(url, data).pipe(
      tap((res: any) => {
        if (res.success) { 
          this.saveToken(res.token);
          this.saveUserRole(res.userRoles);
          this.saveUserName(res.userName);
          this.usernameSubject.next(res.userName)
          this.isLoggedIn(); 
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error); // Rethrow the error for the calling component to handle
      })
    );
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private saveUserRole(userRoles: string[]) {
    localStorage.setItem('userRole', userRoles[0]); // Save only the first role
  }

  private saveUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeadersWithToken(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName')
    this.isLoggedIn();
    this.usernameSubject.next('');
  }
}
