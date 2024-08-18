import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AboutComponent } from './components/about/about.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { CheckoutComponent } from './components/checkout/checkout.component'; 
import { AuthComponent } from './components/auth/auth.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    AboutComponent,
    BookTableComponent,
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    CartModalComponent,
    CheckoutComponent, 
    AuthComponent,
    PaymentComponent,
    PageNotFoundComponent,
    MyOrdersComponent,
    SpecialsComponent,
    ContactComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
