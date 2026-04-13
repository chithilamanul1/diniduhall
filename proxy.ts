import { withAuth } from "next-auth/middleware"

export const proxy = withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  secret: process.env.NEXTAUTH_SECRET || "dinidu-gardens-secret-9922-8822-11",
})

// Protect only admin routes, excluding the login page
export const config = {
  matcher: ["/admin/((?!login).*)"],
}
