import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(data: object) {  
    const url = `${environment.base_url}users/login`;
    return this.http.post(url, data);
  }

  register(data:object) { 
    let url = `${environment.base_url}users/register` 
    return this.http.post(url,data);
  }
  
}
