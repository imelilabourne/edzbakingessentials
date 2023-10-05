import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base } from '../../models/base';
import { QuestionControlService } from '../../services/control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [QuestionControlService]
})
export class FormComponent implements OnInit {
  @Input() questions: Base<string>[] | null = [];
  form: FormGroup;
  payload: string = '';

  constructor(private controlService: QuestionControlService) { }

  ngOnInit(): void {
    if (this.questions) this.form = this.controlService.toFormGroup(this.questions);
  }

  onSubmit(){
    if(this.form.valid){
      this.payload = this.form.getRawValue();
    } else {
      this.payload = ""
    }
  }

}
