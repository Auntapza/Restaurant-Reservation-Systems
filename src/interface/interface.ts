import { ReactNode } from "react";

export interface Layoutinterface {
    children: ReactNode
}

export interface NavbarMenu {
    title: string,
    path: string,
    image: JSX.Element
}

export enum WorkerType {
    cashier,
    chef,
    waiter
}

export interface foodData {
    foodName: string,
    foodPrice: number,
    foodImg: string,
    foodId: number,
    catId: number
}

export interface cartData {
    foodId: number,
    foodName: string,
    foodImg: string,
    foodPrice: number,
    quantity: number
}

export interface tableStatus {
    tableId: string,
    tableStatus: TableState
}

export enum TableState {
    "idle",
    "busy",
    "ordered"
}