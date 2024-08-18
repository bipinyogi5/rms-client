// topbar.component.ts

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service'; // Import AuthService
import Swal from 'sweetalert2'; 
import { TopbarService } from 'src/app/service/topbar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  
  activeIndex: number = 0;
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  username: any; 
  isMobileMenuOpen: boolean = false;

 

  constructor(
 
    private topbarService: TopbarService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    const storedCartItemCount = sessionStorage.getItem('cartItemCount');
    if (storedCartItemCount) {
      this.cartItemCount = parseInt(storedCartItemCount, 10);
    }
  
    this.cartService.cartItemCountChange.subscribe(count => {
      if (count === 0) {
        // Cart is cleared, update cartItemCount accordingly
        this.cartItemCount = count;
        sessionStorage.setItem('cartItemCount', count.toString()); // Update cart item count in sessionStorage
      } else {
        // Update cartItemCount for other changes
        this.cartItemCount = count;
        sessionStorage.setItem('cartItemCount', count.toString()); // Update cart item count in sessionStorage
      }

      
    });
  
    
    this.cartItemCount = this.cartService.cartItemCount;
    this.userName();  
  } 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled'); // Add class when scrolled more than 50px
    } else {
      navbar.classList.remove('scrolled'); // Remove class when at the top
    }
  }

  userName(): any {
    const storedName = this.topbarService.storedUsername();
    return storedName;
  }
  
  
  
  onCartItemCountChange(count: number): void {
    this.cartItemCount = count; 

  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse) {
      if (this.isMobileMenuOpen) {
        navbarCollapse.classList.add('show');
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
  

  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }



  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  openCartModal() {
    this.cartService.openModal();
  }

  openLoginModal() {
    // Call the openLoginModal method from AuthService
    this.authService.openLoginModal();
  }

  logout(): void {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout action here, such as clearing local storage and redirecting
        this.authService.logout(); 
        this.username = null;
        Swal.fire('Logged Out', 'You have been logged out successfully', 'success');
      }
    });
  }
}
