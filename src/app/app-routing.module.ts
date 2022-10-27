import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LandingComponent } from './landing/landing.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landing'},
  {path: 'landing', component: LandingComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'shop', component: ShopComponent},
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: ReceiptComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
