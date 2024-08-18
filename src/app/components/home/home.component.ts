import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuService } from 'src/app/service/menu.service';
import { Location } from '@angular/common';
import { CarouselService } from 'src/app/service/carousel.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: any;
  selectedCategoryId: number | null = null;
  showAllItems: boolean = false;
  carousels: any[] = [];
  selectedTab: number = 1; // Default tab


 customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1  ,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  };
  

  constructor(private menuService:MenuService,
    private router: Router,
     private route:ActivatedRoute,
     private carouselsService: CarouselService,
     private location: Location
    ) { }
  ngOnInit(): void { 
    this.fetchCarouselData();  
    this.route.queryParams.subscribe((query) => {
      console.log('location:',query );
      if(query){
        
      }
      
    })
  }
   reload() {
    this.location.go(this.location.path());
  }
  fetchCarouselData() {
    this.carouselsService.carousel().subscribe((data: any) => {
      console.log("Data", data);
      
      this.carousels = data.carousels;
    });
  }

  relodOnce() {
    console.log(this.location.path());
    
    this.location.go(this.location.path());
  }

  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
  
}
