import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Input } from "../control-types/control.input";
import { Base } from "../models/base";


@Injectable()
export class QuestionDiscountService{
    getInvoiceDiscountFields(){
        const question: Base<string>[] = [
            new Input({
                key: 'discount',
                label: 'Discount',
                value: '',
                required: false,
                order: 1,
                type: 'number'
            }),


            new Input({
                key: 'shippingFee',
                label: 'Shipping Fee',
                value: '',
                required: false,
                order: 2,
                type: 'number'
            })         
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}