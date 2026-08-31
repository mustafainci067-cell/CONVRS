import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16'da middleware, "proxy" olarak yeniden adlandirildi. next-intl'in
// createMiddleware'i ayni islevi gorur: bilinen bir locale yoksa kullaniciyi
// tarayici/browser diline gore ilgili /en, /tr, /de, /es yoluna yonlendirir.
export default createMiddleware(routing);

export const config = {
  // Api, next ic sirketleri ve dosya uzantisi ici olan yollari atla
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};