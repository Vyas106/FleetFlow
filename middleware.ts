import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = "fleetflow_session";

// Define which roles can access which paths
const RBAC_POLICY: Record<string, string[]> = {
    "/dashboard/analytics": ["MANAGER", "FINANCIAL_ANALYST"],
    "/dashboard/maintenance": ["MANAGER", "SAFETY_OFFICER"],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Protection for /dashboard routes
    if (pathname.startsWith("/dashboard")) {
        const sessionCookie = request.cookies.get(SESSION_COOKIE);

        if (!sessionCookie) {
            // Not logged in, redirect to login
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const user = JSON.parse(sessionCookie.value) as { role: string };

            // 2. RBAC check
            const requiredRoles = RBAC_POLICY[Object.keys(RBAC_POLICY).find(key => pathname.startsWith(key)) || ""];

            if (requiredRoles && !requiredRoles.includes(user.role)) {
                // User doesn't have the required role, redirect to dashboard home
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        } catch (e) {
            // Invalid cookie format, redirect to login
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // 3. Prevent logged in users from seeing landing page, login or register pages
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
        const sessionCookie = request.cookies.get(SESSION_COOKIE);
        if (sessionCookie) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login', '/register'],
}

