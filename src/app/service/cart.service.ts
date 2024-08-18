import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, EventEmitter, Injectable, Injector } from '@angular/core';
import { CartModalComponent } from '../components/cart-modal/cart-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private modalComponentRef: any;
  cartItems: any[] = [];
  cartItemCount: number = 0;
  cartItemCountChange: EventEmitter<number> = new EventEmitter<number>(); // Event emitter for cart item count

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef) {
    this.loadCartItemsFromSession();
    this.updateCartItemCount();
  }

  private loadCartItemsFromSession(): void {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  openModal() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CartModalComponent);
    this.modalComponentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.modalComponentRef.hostView);
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeModal() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
    }
  }

  addToCart(item: any): void {
    // Check if the item is already in the cart
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    
    // If the item is not already in the cart, add it with quantity 1
    if (!existingItem) {
      const newItem = { ...item, qty: 1 }; // Adding qty property with value 1
      this.cartItems.push(newItem);
      this.updateCartItemCount(); // Update cartItemCount after adding item
      this.saveCartItemsToSession(); // Save cartItems to session
    } else {
      alert("Item is already in the cart.");
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItemCount(); // Update cartItemCount after clearing cart
    this.saveCartItemsToSession(); // Save cartItems to session
    this.cartItemCountChange.emit(0); // Emit event to indicate cart is cleared
  }
   updateCartItemCount(): void {
    this.cartItemCount = this.cartItems.length;
    sessionStorage.setItem('cartItemCount', this.cartItemCount.toString()); // Save cart item count to sessionStorage
    this.cartItemCountChange.emit(this.cartItemCount);
  }
   saveCartItemsToSession(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
