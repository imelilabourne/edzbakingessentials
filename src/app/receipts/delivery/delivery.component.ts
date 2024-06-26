import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  date: number;
  items: any;
  deliveryDetails: any;

  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.date = Date.now()
    let data: string = '';

    if(localStorage.getItem('DR-data')) {

      data += localStorage.getItem('DR-data')
      
      const parsedData = JSON.parse(data);
      
      const bytes  = CryptoJS.AES.decrypt(parsedData, '1234214214221');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.items = decryptedData.items
      this.deliveryDetails = {
        name: decryptedData.name,
        address: decryptedData.address,
        contactNo: decryptedData.contactNo,
        mod: decryptedData.mod,
        grandTotal: decryptedData.grandTotal
      }
      this.printService.onDataReady()
    }
  }

}
