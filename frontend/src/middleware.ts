import { auth } from '@/auth'
import { getUrl } from '@/lib/get-url'

export default auth(async (req) => {
  const isLoggedIn = !!req.auth
  const permissions = req.auth?.user?.permissions
  const pathname = req.nextUrl.pathname

  //if (isLoggedIn && pathname === '/auth/sign-in') {
  //  return Response.redirect(new URL(getUrl('/')))
  //}

  if (!permissions?.includes('admin') && pathname.startsWith('/admin')) {
    return Response.redirect(new URL(getUrl('/auth/sign-in')))
  }


  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      // se nao estiver logado vai para o login
      return Response.redirect(new URL(getUrl('/auth/sign-in')))
    }
    
    if (!permissions?.includes('admin')) {
      // se estiver logado mas nao for admin vai para a home
      return Response.redirect(new URL(getUrl('/')))
    }
  }

})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}