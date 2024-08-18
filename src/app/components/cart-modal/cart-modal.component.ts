import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {
  @Output() totalChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() subTotalChange: EventEmitter<number> = new EventEmitter<number>();

  cartItems: any[] = [];  
  total: number = 0;
  subTotal: number = 0;
  quantities: number[] = []; 

    constructor(private cartService: CartService, private authService:AuthService, private router: Router) { }
    
    ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems(); 
      this.cartItems.forEach((item, index) => {
        this.quantities.push(item.qty);
      }); 
      this.calculateTotal(); 
      this.loggedIn();
    }

    loggedIn(): boolean{
      return this.authService.isLoggedIn();
    }
 
    increaseQuantity(index: number): void {
      this.quantities[index]++;
      this.calculateTotal();
    }

  decreaseQuantity(index: number): void {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = 0;
    this.subTotal = 0;
    this.cartItems.forEach((item, index) => {
      this.total += this.quantities[index] * item.price;
      this.subTotal += this.quantities[index] * item.price;
    });
    this.totalChange.emit(this.total);
    this.subTotalChange.emit(this.subTotal);

    }
  openLoginModal() { 
    $('#loginModal').modal('show');
    this.authService.openLoginModal();
  }
 

  continueToCheckout(): void {
    $('#cartModal').modal('hide');
    if (!this.loggedIn()) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first to continue',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.openLoginModal();
        }
      });
    } else {
      this.router.navigate(['/checkout']);
    }
  }
  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems()
    $('#cartModal').modal('hide'); 
  }
  

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}
