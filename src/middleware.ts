import { NextRequest, NextResponse } from "next/server";
import api from "./function/api";

export async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin')) {
        console.log('admin sec');
        
    } else if (pathname.startsWith('/worker')) {

    } else if (pathname.startsWith('/app') && pathname.length > 4) {
        try {

            const payload = await api.get('http://localhost:4000/auth', {
                headers: {
                    Cookie: request.cookies,
                    'content-type': 'application/json'
                }
            });

            if (payload.Role === 'admin') {
                return NextResponse.redirect(new URL('/admin', request.url))            
            } else if (payload.Role === 'cashier') {
                return NextResponse.redirect(new URL('/cashier', request.url))            
            } else if (payload.Role === 'chef') {
                return NextResponse.redirect(new URL('/chef', request.url))            
            } else if (payload.Role === 'waiter') {
                return NextResponse.redirect(new URL('/waiter', request.url))            
            }

        } catch {
            return NextResponse.redirect(new URL('/login', request.url))            
        }
    }

}