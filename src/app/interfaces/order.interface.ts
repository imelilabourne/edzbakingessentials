import { Item } from "./item.interface";

export interface Order {
    orders: Item[],
    subTotal: number,
    tax: string,
    grandTotal: number,
    shippingFee: number
}