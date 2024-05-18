import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

// when ever the user on any route page
// firt the route needs to be matched then
// If the user is not signed in he will be
// redirecred, the protectedRoutes is the 
// array which contain those route where the 
// Sign In is need to checked
const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'

])

// the called back fucntion
export default clerkMiddleware((auth,req) => {
    if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};