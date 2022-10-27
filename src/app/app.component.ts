import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import html2canvas from "html2canvas";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private formBuilder: FormBuilder){}

  ngOnInit(){}
}

