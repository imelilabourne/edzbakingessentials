import { Component, OnInit } from '@angular/core';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  list: any[];

  ngOnInit(): void {
  }

  readExcel(e: any){
    const schema = {
      'CODE': {
        prop: 'code',
        type: Number
      },
      'DESCRIPTION': {
        prop: 'desc',
        type: String
      },
      'Quantity per pack': {
        prop: 'qtyPerPack',
        type: String
      }, 
      'VARIANT/COLOR': {
        prop: 'variant',
        type: String
      },
      'UNIT PRICE': {
        prop: 'unitPrice',
        type: String
      }
    }
    let array;
    readXlsxFile(e.target.files[0], {schema}).then((rows) => {
      array = [...rows.rows]
      this.list = array
    })
  }
  

}
