import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  
  // Only protect admin routes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET || "dinidu-gardens-prod-secret-9911-8822"
    })
    
    if (!token) {
      const url = new URL('/admin/login', req.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Protect only admin routes, excluding the login page
export const config = {
  matcher: ["/admin/((?!login).*)"],
}
