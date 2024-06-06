import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';
import * as CryptoJS from 'crypto-js';
import { Item } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  items: any;
  deliveryDetails: any;
  date: number;
  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.date = Date.now()
    if(localStorage.getItem('PO-data')) {
      let data: string = '';
      data += localStorage.getItem('PO-data')
      
      const parsedData = JSON.parse(data);
      console.log(parsedData)
      const bytes  = CryptoJS.AES.decrypt(parsedData, '1234214214221');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      this.items = decryptedData.items
      this.deliveryDetails = {
        name: decryptedData.name,
        address: decryptedData.address,
        contactNo: decryptedData.contactNo,
        tin: decryptedData.tin,
        orderDate: decryptedData.orderDate,
        grandTotal: decryptedData.grandTotal
      }
      this.printService.onDataReady()

      console.log(this.items)
    }
  }

}
