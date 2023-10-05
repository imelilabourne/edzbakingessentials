import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Input } from "../control-types/control.input";
import { Base } from "../models/base";


@Injectable()
export class QuestionService{
    getLoginFields(){
        const question: Base<string>[] = [
            new Input({
                key: 'username',
                label: 'Username',
                value: '',
                required: true,
                order: 1
            }),


            new Input({
                key: 'password',
                label: 'Password',
                value: '',
                required: true,
                order: 2,
                type: 'password'
            })         
        ]

        return of(question.sort((a,b) => a.order - b.order));
    }
}