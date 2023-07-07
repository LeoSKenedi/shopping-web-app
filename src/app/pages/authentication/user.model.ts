import { Product } from "../products/products.model";

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public cartProducts: Product[],
        public favProducts: Product[]
    ) {}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token
    }
}