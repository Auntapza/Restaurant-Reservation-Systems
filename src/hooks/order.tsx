'use client'

import { orderDetail } from "@/interface/interface";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

const defaultOrder: orderDetail = {
    orderTime: '',
    orderDate: new Date().toISOString().split('T')[0],
    foodList: [],
    accId: 0,
    tableId: "A0",
};

// create context
const OrderContext = createContext<{
    order: orderDetail,
    setOrder: Dispatch<SetStateAction<orderDetail>>,
    clear: Function
}>({
    order: defaultOrder,
    setOrder: () => {},
    clear: () => {}
})


// provider
export function OrderProvider({ children } :{
    children : ReactNode
}) {

    const [order, setOrder] = useState<orderDetail>(defaultOrder);

    function clear() {
        setOrder(defaultOrder)
    }
    
    return (
        <OrderContext.Provider value={{order, setOrder, clear}}>
            {children}
        </OrderContext.Provider>
    )
    
}

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }

    return context
}

