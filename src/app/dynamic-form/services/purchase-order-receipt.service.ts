import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Dropdown } from "../control-types/control.dropdown";
import { Input } from "../control-types/control.input";
import { Base } from "../models/base";

@Injectable()
export class POService{
    getPOFields(){
        const question: Base<string>[] = [
            new Input({
                key: 'name',
                label: 'Full Name/ Company Name',
                value: '',
                required: true,
                order: 1,
                type: 'text'
            }),
            new Input({
                key: 'address',
                label: 'Address',
                value: '',
                required: false,
                order: 2,
                type: 'text'
            }),
            new Input({
                key: 'contactNumber',
                label: 'Contact Number',
                value: '',
                required: false,
                order: 3,
                type: 'number'
            }),
            new Input({
                key: 'tin',
                label: 'TIN',
                value: '',
                required: false,
                order: 4,
                type: 'text'
            }),
            new Input({
                key: 'orderDate',
                label: 'Order Date',
                value: '',
                required: false,
                order: 5,
                type: 'date'
            })
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}