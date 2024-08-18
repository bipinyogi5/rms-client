import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  order() { 
    const headers = this.authService.getHeadersWithToken();
    const url = `${environment.base_url}orders`;
    return this.http.get(url, { headers });
  }

  placeOrder(data: object) {  
    const headers = this.authService.getHeadersWithToken();
    const url = `${environment.base_url}orders`;
    return this.http.post(url, data, { headers });
  }

  table() {
    const headers = this.authService.getHeadersWithToken();
    const url = `${environment.base_url}tables`;
    return this.http.get(url, { headers });
  }

  
}
