import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Input } from "../../control-types/control.input";
import { Base } from "../../models/base";

@Injectable()
export class QuestionAddProductService{
    addProductFields(id?: any, desc?: any, code?: any, unitPrice?: any, variant?: any, category? : any){
        const question: Base<string>[] = [
            new Input({
                key: 'category',
                label: 'Category',
                value: category ? category : '',
                required: true,
                order: 1,
                type: 'text'
            }),

            new Input({
                key: 'desc',
                label: 'Product',
                value: desc ? desc : '',
                required: true,
                order: 2,
                type: 'text'
            }),

            new Input({
                key: 'code',
                label: 'Code',
                value: code ? code : '',
                required: true,
                order: 3,
                type: 'number'
            }),    
            
            new Input({
                key: 'unitPrice',
                label: 'Unit Price',
                value: unitPrice ? unitPrice : '',
                required: true,
                order: 4,
                type: 'text'
            }),
            new Input({
                key: 'variant',
                label: 'Variant',
                value: variant ? variant : '',
                required: true,
                order: 5,
                type: 'text'
            }),    
            new Input({
                key: 'variationId',
                label: 'Variant ID',
                value: id ? id : '',
                required: true,
                order: 6,
                type: 'number'
            })   
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}