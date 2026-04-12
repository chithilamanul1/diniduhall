import { withAuth } from "next-auth/middleware"

// In Next.js 16, the middleware convention has been renamed to 'proxy'.
// We export the auth protection logic as a named 'proxy' export.
export const proxy = withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  secret: process.env.NEXTAUTH_SECRET || "dinidu-gardens-secret-9922-8822-11",
})

export const config = {
  matcher: ["/admin/((?!login).*)"],
}
