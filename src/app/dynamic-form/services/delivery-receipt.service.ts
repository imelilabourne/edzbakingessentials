import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Dropdown } from "../control-types/control.dropdown";
import { Input } from "../control-types/control.input";
import { Base } from "../models/base";

@Injectable()
export class DRService{
    getDRFields(){
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
                key: 'contactNo',
                label: 'Contact No.',
                value: '',
                required: false,
                order: 3,
                type: 'number'
            }),
            new Dropdown({
                key: 'mod',
                label: 'Mode of Delivery',
                value: '',
                required: true,
                order: 5,
                type: 'dropdown',
                options: [
                    { key: 'partial', value: 'Partial Delivery'},
                    { key: 'complete', value: 'Complete Delivery'}
                ]
            })
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}