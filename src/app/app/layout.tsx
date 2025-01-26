import Navbar from "@/component/Navbar";
import { OrderProvider } from "@/hooks/order";

import { Layoutinterface } from "@/interface/interface"
export default function MainpageLayout({ children } : Layoutinterface ) {

    return (
        <>
            <Navbar/>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    )
}