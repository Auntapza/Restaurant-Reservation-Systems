import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/admin')) {
        console.log('admin sec');
        
    } else if (request.nextUrl.pathname.startsWith('/worker')) {

    }

}