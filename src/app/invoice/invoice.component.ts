import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { Base } from '../dynamic-form/models/base';
import { ARService } from '../dynamic-form/services/acknowledgement-receipt.service';
import { QuestionDiscountService } from '../dynamic-form/services/invoice-discount.service';
import { Item } from '../interfaces/item.interface';
import { Order } from '../interfaces/order.interface';
import { GeneralService } from '../services/general.service';
import { InvoiceService } from '../services/invoice.service';
import { PrintService } from '../services/print.service';
import { POService } from '../dynamic-form/services/purchase-order-receipt.service';
import { DRService } from '../dynamic-form/services/delivery-receipt.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [ ARService, QuestionDiscountService, POService, DRService ]
})
export class InvoiceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  items: Item[] = [];
  itemsDropdown: any;
  itemsDropdownVariation: any;
  itemsDropdownProducts: any;
  isEmpty: boolean = false; 
  isInvoicePrint: boolean = false;
  order: Order = {
    subTotal : 0,
    tax: '',
    grandTotal: 0,
    orders: [],
    shippingFee: 0
  };
  className = 'selected'
  isClicked:boolean = false;
  faTrash = faTrash;
  faEdit = faEdit
  date: number;
  count: number = 1;
  selectedItem: any[] = [];
  print = true;
  questions: Observable<Base<any>[]>
  questionsAR: Observable<Base<any>[]>;
  questionsPO: Observable<Base<any>[]>;
  questionsDR: Observable<Base<any>[]>;

  constructor(private formBuilder: FormBuilder, private service: InvoiceService, public printService:PrintService, 
    public generalService: GeneralService,
    ARService: ARService,
    POService: POService,
    DRService: DRService,
    discountService: QuestionDiscountService) {
    this.questionsAR = ARService.getARFields()
    this.questions = discountService.getInvoiceDiscountFields();
    this.questionsPO = POService.getPOFields()
    this.questionsDR = DRService.getDRFields()
  }

  ngOnInit(){
    console.log("APP_INIT_v6");
    
    this.getProducts();
    this.formInitialization();
  }

  getProducts(){
    this.service.getProductList().subscribe((data) => {
      let array: any = data
      this.itemsDropdown = array;
      this.itemsDropdownProducts = array.filter((element: any,index: any, array: any)=>array.findIndex((v2: any)=>(v2.code===element.code))===index);

      this.itemsDropdownProducts.sort(function(a: any, b: any) {
        if (a['category'] < b['category']) return -1;
        if (a['category'] > b['category']) return 1;
        return 0;
      });
    })
  }

  getAR() {
    this.generalService.showARDialog = true
  }

  getDR() {
    this.generalService.showDRDialog = true
  }

  getPO() {
    this.generalService.showPODialog = true
  }

  getPOFieldValue(e: any) {
    this.isInvoicePrint = false
    const data = {
      name: e.name,
      address: e.address,
      contactNo: e.contactNumber,
      tin: e.tin,
      grandTotal: this.order.grandTotal,
      items: this.items,
      orderDate: e.orderDate
    }
    console.log(data)
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '1234214214221').toString();
    localStorage.setItem("PO-data", JSON.stringify(ciphertext))
    this.printService.printDocument('PO');
  }

  getARFieldValue(e: any) {
    console.debug(e)
    this.isInvoicePrint = false
    const data = {
        fullname: e.firstName + ' ' + e.lastName,
        payment: e.payment,
        mop: e.mop,
        mopDetails: e.mopDetails,
        description: e.purchasedItems,
        authSig: e.authSig
    }
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '1234214214221').toString();
    localStorage.setItem("AR-data", JSON.stringify(ciphertext))
    this.printService.printDocument('AR');
  }

  getDRFieldValue(e: any) {
    this.isInvoicePrint = false
    const data = this.items.map(item => {
      return {
        quantity: item.quantity,
        description: item.description,
        amount: item.quantity * item.uPrice,
      }
    })

    const DRdata = {
      grandTotal: this.order.grandTotal,
      items: data,
      name: e.name,
      address: e.address,
      contactNo: e.contactNo,
      mod: e.mod
    }

    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(DRdata), '1234214214221').toString();
    localStorage.setItem("DR-data", JSON.stringify(ciphertext))
    this.printService.printDocument('DR');
  }


  onOptionsSelected(value: any){
    const descValue = this.form.controls['description'].value;
    this.itemsDropdownVariation = this.itemsDropdown.filter((data: any) => data.code == descValue)
  }

  formInitialization(){
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      variation: [''],
      qty: ['', Validators.required],
      invoiceNumber: ['', [Validators.pattern('[0-9]*'), ]],
      name: '',
      company: '',
      contactNo: '',
      orderId: '',
      date: [''],
      address: '',
      sfFee: 0,
      discount: 0,
      customPrice: ''
    })
  }

  getValue(controlName: string) { 
    let num
    if(controlName === 'invoiceNumber') {
      if(this.form.controls['invoiceNumber'].value){
        num = this.form.controls['invoiceNumber'].value;
        return String(num).padStart(5,'0')
      } else return '';
    }
    else
      return this.form.controls[controlName].value; 
  }

  add(): void{
    if(this.form.valid){
      this.order.subTotal = 0;
      this.order.grandTotal = 0;  
      this.form.controls['sfFee'].reset();
      this.form.controls['discount'].reset();

      let itemAdded: { variationId: string | number; unitPrice: number; code: any; desc: any; variant: any; };
      
      if(this.itemsDropdownVariation.length > 1) {
        itemAdded = this.itemsDropdown.find((data: any) => this.getValue('variation') == data.variationId)
      } else {
        itemAdded = this.itemsDropdown.find((data: any) => this.getValue('description') == data.code);
      }

      const isItemExisting = this.items.find(item => item.variationId === itemAdded.variationId);



      if(isItemExisting && !this.form.controls['customPrice'].value) {
        const filteredItems = this.items.filter(item => item.description !== isItemExisting.description)
        isItemExisting.quantity += this.getValue('qty');
        isItemExisting.cost = isItemExisting.quantity * itemAdded.unitPrice;
        this.items = [...filteredItems, isItemExisting]
      }
      else {
        let descrip =  itemAdded.variant ? `${itemAdded.desc} (Variation: ${itemAdded.variant}` : `${itemAdded.desc}`;
        if(this.form.controls['customPrice'].value){
          itemAdded.unitPrice = this.form.controls['customPrice'].value
        }
        this.items.push({
          id: this.count,
          code: itemAdded.code,
          description: descrip,
          quantity: this.getValue('qty'),
          uPrice: itemAdded.unitPrice,
          cost: itemAdded.unitPrice * this.getValue('qty'),
          variationId: itemAdded.variationId
        });
      }
      this.isEmpty = true;
      this.count++;
      for (let i of this.items){
        this.order.subTotal += i.quantity * i.uPrice;
        this.order.grandTotal += i.quantity * i.uPrice;
      } 
      this.form.controls['description'].reset();
      this.form.controls['variation'].reset();
      this.form.controls['qty'].reset();
      this.form.controls['customPrice'].reset()
      this.itemsDropdownVariation = []
    } else {
      this.form.controls['description'].markAllAsTouched();
      this.form.controls['variation'].markAllAsTouched();
      this.form.controls['qty'].markAllAsTouched();
    }
    this.items.sort((a, b) => a.description.localeCompare(b.description));
    this.getProducts()
  }

  actionRow(i: any, item: any) {
    const filtered = this.selectedItem.find(selected => selected == item.id)
    if(filtered)
      this.selectedItem = this.selectedItem.filter(temp => temp !== item.id);
    else this.selectedItem.push(item.id);    

    
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
    this.form.reset({
      sfFee: this.getValue('sfFee'),
      discount: this.getValue('discount')
    });
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
        date: this.form.controls['date'].value,
        contactNo: this.form.controls['contactNo'].value,
        orderId: this.form.controls['orderId'].value,
        invoiceNumber: this.getValue('invoiceNumber')
      },
      shippingFee: this.form.controls['sfFee'].value ? this.form.controls['sfFee'].value : 0,
      discount: this.form.controls['discount'].value ? this.form.controls['discount'].value : 0 
    }
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), '1234214214221').toString();
    localStorage.setItem("data", JSON.stringify(ciphertext))
    this.isInvoicePrint = true;
    this.printService.printDocument('invoice');
  }

  getDiscount(form: any){
    let sf = 0;
    let discount = 0;
    if(form.shippingFee) {
      sf = Number(form.shippingFee);
      this.form.controls['sfFee'].setValue(form.shippingFee)
    } else {
      this.form.controls['sfFee'].reset()
    }

    if(form.discount) {
      discount = Number(form.discount)
      this.form.controls['discount'].setValue(form.discount);
    } else {
      this.form.controls['discount'].reset()
    }

    this.order.grandTotal = this.order.subTotal + sf - discount;
    if (this.order.grandTotal <= 0) {
      this.order.grandTotal = 0;
    }
  }
}
