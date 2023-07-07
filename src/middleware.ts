import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

// Modify ONLY when special auth logic is needed
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      redirectToSignIn({ returnBackUrl: req.url });
      return;
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
