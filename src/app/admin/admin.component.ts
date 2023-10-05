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
      'Product ID': {
        prop: 'code',
        type: Number
      },
      'Product Name': {
        prop: 'desc',
        type: String
      },
      'Stock': {
        prop: 'stock',
        type: String
      }, 
      'Variation ID': {
        prop: 'variationId'
      },
      'Variation Name': {
        prop: 'variant',
        type: String
      },
      'Price': {
        prop: 'unitPrice',
        type: String
      },
      'Category': {
        prop: 'category',
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
