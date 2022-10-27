import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LandingComponent } from './landing/landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { NavBarComponent } from './sections/nav-bar/nav-bar.component';
import { FooterComponent } from './sections/footer/footer.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ReceiptComponent } from './receipt/receipt.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InvoiceComponent,
    AdminComponent,
    ShopComponent,
    NavBarComponent,
    FooterComponent,
    PrintLayoutComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
