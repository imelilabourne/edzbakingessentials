import { Component, OnInit } from '@angular/core';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faUnderline =faUnderline;
  constructor() { }

  ngOnInit(): void {
  }

}
