export interface foodList {
    foodId: number,
    foodName: string,
    foodPrice: number,
    foodImg: string,
    rate_score?: number
}

export interface tokenPayload {
    username: string,
    role: Role
}

export interface cartList {
    foodId: number;
    foodName: string;
    foodImg: string | null;
    foodPrice: number;
    quantity: number;
}