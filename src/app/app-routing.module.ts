import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'specials',
    component: SpecialsComponent
  },
  {
    path: 'book-a-table',
    component: BookTableComponent
  }, 
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
