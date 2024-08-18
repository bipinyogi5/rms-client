import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http:HttpClient) { }
  
  carousel() { 
    const url = `${environment.base_url}carousels/all`;
    return this.http.get(url); 
  }


}
