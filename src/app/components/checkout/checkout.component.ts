import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  subTotal: number = 0;
  remark: string = ''; 
  formStructure: any; 
  loggedIn: boolean = false; 
  selectedTableId: number = 0;
  tables: any;
  orderId: number=0;  
  initRes: any;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService
  ) { 
    
    this.formStructure = this.fb.group({
      tableId: [null, Validators.required], // Create form control for tableId with validators
      description: ['', Validators.required],
      items: [[]]
    });
  }

  ngOnInit(): void {
    this.getTables();
    this.loggedIn = this.authService.isLoggedIn();
    if (!this.loggedIn) {
      this.openLoginModal();
    }
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }
  openLoginModal() { 
    this.authService.openLoginModal();
  }

  continueShopping() {
    this.router.navigate(['/menu']);
  }
  
  getTables() {
    this.orderService.table().subscribe(
      (res: any) => { 
        if (Array.isArray(res?.tables)) {
          this.tables = res.tables.map((table: any) => ({ id: table.id, name: table.name }));
        } else {
          console.error('Invalid response format:', res);
        }
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartService.saveCartItemsToSession(); // Update session storage after removing the item
      this.cartService.updateCartItemCount(); // Update cart item count after removing the item
    }
  }
  

  clearCart(): void {
    this.cartItems = [];
  }

  updateQuantity(item: any, quantity: number): void {
    item.quantity = quantity;
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.total = 0;
    this.subTotal = 0;
    this.cartItems.forEach(item => {
      item.total = item.price * item.quantity;
      this.total += item.total;
      this.subTotal += item.total;
    });
  }
  isOrderQtyZero(): boolean {
    return this.cartItems.length === 0 || this.cartItems.every(item => item.quantity === 0);
  }
 
  createOrder(): void {
    const orderData = {
      description: this.remark,
      tableId: this.selectedTableId,
      items: this.cartItems.map(item => ({ foodItemId: item.id, quantity: item.quantity, description: item.description }))
    };  
    this.orderService.placeOrder(orderData).subscribe((res: any) => {
      console.log('Order created successfully:', res);
      this.orderId = res.orderId;  
      this.initPayment();   
    }, error => {
      console.error('Error creating order:', error);
    });
  }

  initPayment(): void {
    if (this.orderId !== null) {
      this.paymentService.initPayment(this.orderId).subscribe((res: any) => {
        console.log('Payment response:', res);
        this.initRes = res; 
        const paymentUrl = res.data.payment_url; 
        window.location.href = paymentUrl;
      }, error => {
        console.error('Error processing payment:', error);
      });
    } else {
      console.error('Order ID is null, cannot process payment.');
    }
  }
    
} 


