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