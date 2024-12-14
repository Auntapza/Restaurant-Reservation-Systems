export interface foodList {
    foodId: number,
    foodName: string,
    foodPrice: number,
    foodImg: string,
    rate_score: number
}

export interface tokenPayload {
    username: string,
    role: Role
}