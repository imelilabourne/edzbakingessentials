import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    constructor(private httpClient: HttpClient){}

    getProductList() {
        return this.httpClient.get('assets/items.json');
    }

    getSQL() {
        return this.httpClient.get('http://localhost:3000/api/usersSQL');
    }
}