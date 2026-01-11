// ═══════════════════════════════════════════════════════════════════════════════
// PROXY
// Handles i18n routing, Supabase session refresh, and route protection
// ═══════════════════════════════════════════════════════════════════════════════

import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Routes that require authentication
const protectedRoutes = [
  '/overview',
  '/finance',
  '/productivity',
  '/second-brain',
  '/settings',
];

// Routes that should redirect to dashboard if authenticated
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function proxy(request: NextRequest) {
  // First, handle i18n routing
  let response = intlMiddleware(request);

  // Skip Supabase session check if credentials are not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // In development without Supabase, just pass through
    return response;
  }

  // Create Supabase client for session management
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Remove locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, '');

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Get locale from pathname
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(`/${locale}/overview`, request.url));
  }

  // Copy cookies from Supabase response
  const supabaseCookies = response.cookies.getAll();
  supabaseCookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie);
  });

  return response;
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files
  // - _next internal files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
