import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  viewCategory() { 
    const url = `${environment.base_url}categories/all-category`;
    return this.http.get(url); 
  }
}
