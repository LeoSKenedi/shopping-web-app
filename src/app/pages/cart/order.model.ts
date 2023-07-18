import { Product } from "../products/products.model";

export class Order {
    public name: string;
    public surname: string;
    public phone: number;
    public email: string;
    public products: Product[]
    public totalPrice: number

    constructor(name: string, surname: string, phone: number, email: string, products: Product[], totalPrice: number) 
    {
        this.name = name
        this.surname = surname
        this.phone = phone
        this.email = email
        this.products = products
        this.totalPrice = totalPrice
    }
}