import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';
import { Item } from '../interfaces/item.interface';
import { Order } from '../interfaces/order.interface';
import { InvoiceService } from '../services/invoice.service';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  items: Item[] = [];
  itemsDropdown: any;
  isEmpty: boolean = false; 
  order: Order = {
    subTotal : 0,
    tax: '',
    grandTotal: 0,
    orders: []
  };
  className = 'selected'
  isClicked:boolean = false;
  faTrash = faTrash;
  date: number;
  count: number = 1;
  selectedItem: any[] = [];
  print = true;
  constructor(private formBuilder: FormBuilder, private service: InvoiceService, public printService:PrintService) { }

  ngOnInit(){
    this.service.getProductList().subscribe(data => this.itemsDropdown = data);
    this.formInitialization();
  }

  formInitialization(){
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      qty: ['', Validators.required],
      name: '',
      company: '',
      date: [''],
      address: ''
    })
  }

  getValue(controlName: string) { 
    return this.form.controls[controlName].value; 
  }

  add(): void{
    if(this.form.valid){
      this.order.subTotal = 0;
      this.order.grandTotal = 0;
      const itemAdded = this.itemsDropdown.find((data: any) => this.getValue('description') == data.code)
      this.items.push({
        id: this.count,
        description: `${itemAdded.desc} (Variation: ${itemAdded.variant})`,
        quantity: this.getValue('qty'),
        uPrice: itemAdded.unitPrice,
        cost: itemAdded.unitPrice * this.getValue('qty')
      });
      this.isEmpty = true;
      this.count++;
      for (let i of this.items){
        this.order.subTotal += i.quantity * i.uPrice;
        this.order.grandTotal += i.quantity * i.uPrice;
      } 
      this.form.controls['description'].reset();
      this.form.controls['qty'].reset();
    } else {
      this.form.controls['description'].markAllAsTouched();
      this.form.controls['qty'].markAllAsTouched();
    }
  }

  actionRow(i: any, item: any) {
    this.selectedItem.push(item.id);    
    this.isClicked = !this.isClicked;
      if($(".class"+i).hasClass("selected")) $(".class"+i).removeClass("selected")
      else $(".class"+i).addClass('selected')
  }

  removeSelected() {
    this.order.subTotal = 0;
    this.order.grandTotal = 0;

    for(let i of this.selectedItem) this.items = this.items.filter(item => item.id !== i)

    if(this.items.length === 0 ) this.isEmpty = false

    for (let i of this.items){
      this.order.subTotal += i.quantity * i.uPrice;
      this.order.grandTotal += i.quantity * i.uPrice;
    } 
  }

  clear(): void {
    this.form.reset();
  }
  downloadAsPDF(){
    const data = {
      items: this.items,
      subTotal: this.order.subTotal,
      grandTotal: this.order.grandTotal,
      customerInfo: {
        name: this.form.controls['name'].value,
        company: this.form.controls['company'].value,
        address: this.form.controls['address'].value,
        date: this.form.controls['date'].value
      }
    }
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '1234214214221').toString();
    localStorage.setItem("data", JSON.stringify(ciphertext))
    this.printService.printDocument('invoice', ['101', '102']);
  }

}
