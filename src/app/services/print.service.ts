import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  designVersion: number = 1;
  constructor(private router: Router) { }

  printDocument(documentName: string) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': [documentName]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
      window.print();
    }, 400);
  }
  
}
