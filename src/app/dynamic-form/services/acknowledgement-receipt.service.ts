import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Dropdown } from "../control-types/control.dropdown";
import { Input } from "../control-types/control.input";
import { Base } from "../models/base";

@Injectable()
export class ARService{
    getARFields(){
        const question: Base<string>[] = [
            new Input({
                key: 'firstName',
                label: 'First Name',
                value: '',
                required: true,
                order: 1,
                type: 'text'
            }),
            new Input({
                key: 'lastName',
                label: 'Last Name',
                value: '',
                required: true,
                order: 2,
                type: 'text'
            }),
            new Input({
                key: 'payment',
                label: 'Payment',
                value: '',
                required: true,
                order: 3,
                type: 'number'
            }),
            new Input({
                key: 'purchasedItems',
                label: 'Purchased Items/Description',
                value: '',
                required: true,
                order: 4,
                type: 'text'
            }),
            new Dropdown({
                key: 'mop',
                label: 'Mode of Payment',
                value: '',
                required: true,
                order: 5,
                type: 'dropdown',
                options: [
                    { key: 'cash', value: 'Cash'},
                    { key: 'bank', value: 'Bank'},
                    { key: 'check', value: 'Check'}
                ]
            }),  
            new Input({
                key: 'mopDetails',
                label: 'MOP Details',
                value: '',
                required: false,
                order: 6,
                type: 'text'
            }),  
            new Input({
                key: 'authSig',
                label: 'Authorized Signatory',
                value: 'Edrealeen de Torres',
                required: true,
                order: 7,
                type: 'text'
            }),  
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}