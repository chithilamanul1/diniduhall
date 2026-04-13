import { withAuth } from "next-auth/middleware"

export const proxy = withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  secret: process.env.NEXTAUTH_SECRET || "dinidu-gardens-prod-secret-9911-8822",
  trustHost: true,
})

// Protect only admin routes, excluding the login page
export const config = {
  matcher: ["/admin/((?!login).*)"],
}
