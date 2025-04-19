import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware();

export function middleware(request: NextRequest) {
  // Simple middleware that doesn't do much, just to ensure it works
  return NextResponse.next();
}

// Optional: Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /_static (static files)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside public (favicon.ico, robots.txt, etc.)
     */
    '/((?!api|_next|_static|_vercel|fonts|images|[\\w-]+\\.\\w+).*)',
  ],
};