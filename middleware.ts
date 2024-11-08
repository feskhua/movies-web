import {cookies} from "next/headers";
import { NextResponse, NextRequest } from 'next/server'

export async function  middleware(request: NextRequest) {
  const cookie = (await cookies()).get('session')?.value
  
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/movies', request.url));
  }
  
  if (cookie) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
      return NextResponse.redirect(new URL('/movies', request.url));
    }
    
    return NextResponse.next()
  }
  
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/movies', '/movies/[id]', '/', '/movies/add'],
}
