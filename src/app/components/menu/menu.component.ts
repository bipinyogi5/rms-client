import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from 'src/app/service/cart.service';
import { MenuService } from 'src/app/service/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MenuComponent {
  categories: any;
  selectedCategoryId: number | null = null;

  constructor(private menuService: MenuService, private cartService: CartService) { }

  ngOnInit(): void {
    this.menu();
  }

  menu() {
    this.menuService.viewCategory().subscribe((data: any) => {
      this.categories = data.categories;
    });
  }

  handleCategoryClick(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }

  getFoodItemsByCategoryId(categoryId: number | null): any[] {
    if (categoryId === null) {
      return this.categories.flatMap((category: any) => category.foodItems);
    }
    const category = this.categories.find((cat: any) => cat.id === categoryId);
    return category ? category.foodItems : [];
  }

  addToCart(foodItem: any): void { 
    this.cartService.addToCart(foodItem);
    const name = foodItem.name;
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: "success",
      timerProgressBar: false,
      timer: 5000,
      title: `${name} added to cart`
    });
  }
}
