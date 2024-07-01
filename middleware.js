import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard',
]);

export default clerkMiddleware((auth, req) => {
  if (req.url && (req.url.includes('/dashboard') || req.url.includes('/edit-form')) ) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};