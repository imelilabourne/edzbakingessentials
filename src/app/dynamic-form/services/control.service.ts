
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Base } from "../models/base";


@Injectable()
export class QuestionControlService{
    toFormGroup(questions: Base<string>[]){
        const group: any = {};

        questions.forEach(question => {
            if(question.key === 'variationId' && question.value) { //to be refactored - dynamic solution
                group[question.key] = new FormControl({value:question.value, disabled: true}, Validators.required)
            } else {
                group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) 
                    : new FormControl(question.value || '');
            }
        })

        return new FormGroup(group);
    }
}