import { cartData } from "@/interface/interface";
import api from "./api";
import { redirect } from "next/navigation";


class Cart {
    
    cartList:cartData[] = [];
    private userId: number = 0;

    constructor() {
        try {
            api.get('http://localhost:4000/auth').then(res => {
                this.userId = Number(res.userId)
            })
        } catch {}      
    }

    async get() {
        this.cartList = await api.get('http://localhost:4000/cart/'+this.userId)
        return this.cartList
    }

    async add(foodId:number, quantity:number) {
        if (this.userId) {
            api.post('http://localhost:4000/cart/'+this.userId, {
                foodId,
                quantity
            }).then(() => {
                this.get();
            })
        }
        
    }
    
    async update(foodId:number, quantity:number) {
        api.put('http://localhost:4000/cart/'+this.userId, {
            foodId,
            quantity
        }).then(() => {
            this.get();
        })
    }

    async remove(foodId:number) {
        api.delete('http://localhost:4000/cart/'+this.userId, {
            foodId,
        }).then(() => {
            this.get();
        })
    }

}

export default new Cart