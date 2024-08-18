import { Injectable } from '@angular/core'; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  userName: any;
  constructor(private authService: AuthService) { }

  storedUsername(): string {
    this.userName = localStorage.getItem('userName');
    return this.userName;
  }
}
