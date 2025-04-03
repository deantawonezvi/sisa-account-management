import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // If user is not signed in and the current path is not /auth/login or /auth/signup,
    // redirect to /auth/login

    if (!session &&
        !req.nextUrl.pathname.startsWith('/auth/login') &&
        !req.nextUrl.pathname.startsWith('/auth/signup')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // If user is signed in and the current path is /auth/login or /auth/signup,
    // redirect to /dashboard
    if (session &&
        (req.nextUrl.pathname.startsWith('/auth/login') ||
            req.nextUrl.pathname.startsWith('/auth/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth/callback).*)'],
};