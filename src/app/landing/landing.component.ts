import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'animate.css';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isHidden: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.isHidden = true
    } , 5000)
  }

  generateInvoice(): void {
    this.router.navigateByUrl("invoice");
  }

}
