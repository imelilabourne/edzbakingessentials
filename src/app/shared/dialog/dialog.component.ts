import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormComponent } from 'src/app/dynamic-form/components/form/form.component';
import { Base } from 'src/app/dynamic-form/models/base';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(public generalService: GeneralService, private formBuilder: FormBuilder) { }

  form: FormGroup
  @Output() discountEmitter: EventEmitter<any> = new EventEmitter();
  @Input() questions: Observable<Base<any>[]>
  @ViewChild('template') template: FormComponent
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      discount: '',
      shippingFee: ''
    })
  }

  // addDiscount(){
  //   this.discountEmitter.emit(this.form.value)
  //   this.generalService.showDialog = false
  // }

  cancelDialog(msg: string) {
    this.generalService.showDialog = false
    this.generalService.showARDialog = false
    this.cancel.emit(msg)
  }

  addDiscount(){
    this.template.onSubmit()
    this.discountEmitter.emit(this.template.payload)
    this.generalService.showDialog = false
    this.generalService.showARDialog = false
  }
}
