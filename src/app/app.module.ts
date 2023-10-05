import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldComponent } from './dynamic-form/components/field/field.component';
import { FormComponent } from './dynamic-form/components/form/form.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LandingComponent } from './landing/landing.component';
import { LocationComponent } from './location/location.component';
import { ArraySortPipe } from './pipes/sort.pipe';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { AcknowledgementComponent } from './receipts/acknowledgement/acknowledgement.component';
import { DeliveryComponent } from './receipts/delivery/delivery.component';
import { FooterComponent } from './sections/footer/footer.component';
import { NavBarComponent } from './sections/nav-bar/nav-bar.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ProductsComponent } from './shop/products/products.component';
import { ShopComponent } from './shop/shop.component';


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
    ReceiptComponent,
    LocationComponent,
    ProductsComponent,
    DialogComponent,
    FieldComponent,
    FormComponent,
    AcknowledgementComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ ArraySortPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
