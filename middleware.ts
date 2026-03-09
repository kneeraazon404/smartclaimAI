import { auth } from "@/lib/auth"

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isProtected = req.nextUrl.pathname.startsWith('/evaluate');

  if (isAuthPage) {
    if (isAuth) {
      return Response.redirect(new URL('/evaluate', req.nextUrl));
    }
    return null;
  }

  if (isProtected && !isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return Response.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl)
    );
  }
})

export const config = {
  matcher: ['/evaluate', '/login']
}
