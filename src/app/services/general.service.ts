import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  showDialog: boolean = false;
  showARDialog: boolean = false;
  showDRDialog: boolean = false;
  showPODialog: boolean = false;
  constructor() { }
}
