import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as numtoWords from 'number-to-words';
import { PrintService } from 'src/app/services/print.service';


@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent implements OnInit {
  amountWordings: string
  date: number;
  amount = 0;
  details: any
  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.date = Date.now()
    let data: string = '';
    if(localStorage.getItem('AR-data')) {

      data += localStorage.getItem('AR-data')
      
      const parsedData = JSON.parse(data);
      
      const bytes  = CryptoJS.AES.decrypt(parsedData, '1234214214221');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.amount = decryptedData.payment
      
      
      const hasDeci = (decryptedData.payment).split('.')
      let withDeci = ''
      if (hasDeci[1] && hasDeci[1] != 0 && hasDeci[1] !== '00') {
        const deciToWords = numtoWords.toWords(hasDeci[1])
        withDeci = ` AND ${deciToWords} cents` 
      } 
      
      this.amountWordings = numtoWords.toWords(decryptedData.payment) + withDeci + " " + "PESOS ONLY"
      this.details = {
        fullname : decryptedData.fullname,
        // payment: `${decryptedData.payment} and ${withDeci}`,
        mop: decryptedData.mop,
        mopDetails: decryptedData.mopDetails,
        authSig: decryptedData.authSig,
        description: decryptedData.description
      }
      this.printService.onDataReady()
    }
    
  }

}
