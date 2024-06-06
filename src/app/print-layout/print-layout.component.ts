import { Component, Input, OnInit } from '@angular/core';
import { PurchaseOrderComponent } from '../receipts/purchase-order/purchase-order.component';
import { Router } from '@angular/router';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {
  imageSource: String = 'assets/ebe.jpg';
  headerVersion: number = 1;

  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    console.log(this.printService.designVersion)
    this.headerVersion = this.printService.designVersion
  }

}
