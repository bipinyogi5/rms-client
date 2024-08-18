// my-orders.component.ts
import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: any = null;

  constructor(private orderService: OrderService) {
    this.getOrders();
  }

  getOrders() {
    this.orderService.order().subscribe((data: any) => {
      this.orders = data;
      console.log("Orders fetched", this.orders);
      
    }, (error) => {
      console.error('Error fetching orders:', error);
    });
  }
}
