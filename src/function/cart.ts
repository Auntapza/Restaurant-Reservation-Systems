import { foodData } from "@/interface/interface";
import api from "./api";

class cart {
    
    cartList:foodData[];

    constructor() {
        this.cartList = [];

        api.get('http://localhost:4000/cart').then(res => {
            this.cartList = res
        })        

    }

}

export default new cart