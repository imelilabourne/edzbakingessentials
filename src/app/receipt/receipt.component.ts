import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as CryptoJS from 'crypto-js';
import { CustomerInfo } from '../interfaces/customer.interface';
import { Item } from '../interfaces/item.interface';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  faTrash = faTrash;
  items: Item[];
  total = {
    subTotal: 0,
    grandTotal: 0
  }
  customerInfo: CustomerInfo;
  constructor(public printService:PrintService) { }

  ngOnInit(): void {
    let data: string = '';
    if(localStorage.getItem('data')) {
      data += localStorage.getItem('data')
      const parsedData = JSON.parse(data);

      var bytes  = CryptoJS.AES.decrypt(parsedData, '1234214214221');
      
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if( data ) {
        this.items = decryptedData.items
        this.total.subTotal = decryptedData.subTotal;
        this.total.grandTotal = decryptedData.grandTotal;
        this.customerInfo = decryptedData.customerInfo
      }
      this.printService.onDataReady()
    }
  }
}
