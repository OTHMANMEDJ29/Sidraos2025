// ═══════════════════════════════════════════════════════════════════════════════
// AUTH CALLBACK ROUTE
// Handles OAuth callbacks and email confirmation
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/en/overview';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Successful authentication
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      if (isLocalEnv) {
        // In development, redirect to localhost
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // In production, use the forwarded host
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If there's an error, redirect to error page
  return NextResponse.redirect(`${origin}/en/login?error=auth_callback_error`);
}
