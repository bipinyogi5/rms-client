import { Injectable } from '@angular/core';// Import the environment variable
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient, private authService:AuthService) { }


  initPayment(id: number) {  
    const headers = this.authService.getHeadersWithToken();
    const url = `${environment.base_url}payments/${id}`; 
    return this.http.get(url, {headers} );
  }

  paymentLookup(pidx:string, orderId:string) {
    const headers = this.authService.getHeadersWithToken();
    const url = `${environment.base_url}payments/bill-detail/${orderId}?pidx=${pidx}`;
    return this.http.get(url, {headers});
  }

}
