import { NextRequest, NextResponse } from "next/server";
import api from "./function/api";

async function getPayload(req: NextRequest) {
    return await api.get('http://localhost:4000/auth', {
        headers: {
            Cookie: req.cookies,
            'content-type': 'application/json'
        }
    });
}

export async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin')) {
        try {

            const payload = await getPayload(request)

            if (payload.Role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url))            
            }
            
        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }
        
    } else if (pathname.startsWith('/cashier')) {

        try {

            const payload = await getPayload(request)

            if (payload.Role !== 'cashier') {
                return NextResponse.redirect(new URL('/login', request.url))            
            }
            
        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }

    } else if (pathname.startsWith('/chef')) {

        try {

            const payload = await getPayload(request)

            if (payload.Role !== 'customer') {
                return NextResponse.redirect(new URL('/login', request.url))            
            }
            
        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }

    } else if (pathname.startsWith('/waiter')) {
        try {

            const payload = await getPayload(request)

            if (payload.Role !== 'customer') {
                return NextResponse.redirect(new URL('/login', request.url))            
            }
            
        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }
    }else if (pathname.startsWith('/app') && pathname.length > 4) {
        try {

            const payload = await getPayload(request)

            if (payload.Role !== 'customer') {
                return NextResponse.redirect(new URL('/login', request.url))            
            }
            
        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }
    }

}