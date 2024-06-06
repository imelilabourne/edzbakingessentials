import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTINFormatter]'
})
export class TINFormatterDirective {
  private regex: RegExp = new RegExp(/^[0-9]{0,3}-?[0-9]{0,3}-?[0-9]{0,3}-?[0-9]{0,4}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-numeric characters

    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6 && value.length <= 9) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 9) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}-${value.slice(9, 14)}`;
    }

    input.value = value;
  }
}