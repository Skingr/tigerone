// protect routes and handle redirects based on auth state
import { auth } from "@/app/auth"
 
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login')
  
  // Redirect authenticated users away from login page
  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL('/chat', req.url))
  }
  
  // Protect chat routes
  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/chat')) {
    return Response.redirect(new URL('/', req.url))
  }
})

// Specify which routes should be handled by middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
