import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base } from '../../models/base';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() question: Base<string>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
