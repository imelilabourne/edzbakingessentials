import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LandingComponent } from './landing/landing.component';
import { LocationComponent } from './location/location.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { AcknowledgementComponent } from './receipts/acknowledgement/acknowledgement.component';
import { ProductsComponent } from './shop/products/products.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landing'},
  {path: 'landing', component: LandingComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'shop', component: ShopComponent}, 
  {path: 'products', component: ProductsComponent},
  {path: 'location', component: LocationComponent},
  // { path: 'print',
  //   outlet: 'print',
  //   component: PrintLayoutComponent,
  //   children: [
  //     { path: 'invoice', component: ReceiptComponent }
  //   ]
  // },

  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: ReceiptComponent },
      { path: 'AR', component: AcknowledgementComponent },
    ]
  },
  { path: '**', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
