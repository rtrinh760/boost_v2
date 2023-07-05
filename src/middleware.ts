import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { AuthObject } from "@clerk/nextjs/dist/types/server";
import { NextRequest, NextResponse } from "next/server";

type AfterAuthFunction = (
  auth: AuthObject & {
    isPublicRoute: boolean;
  },
  req: NextRequest,
) => void;

const afterAuth: AfterAuthFunction = (auth, req) => {
  if (!auth.userId && !auth.isPublicRoute) {
    redirectToSignIn({ returnBackUrl: req.url });
    return;
  }

  if (auth.userId && req.nextUrl.pathname !== "/dashboard") {
    const dashboard = new URL("/dashboard", req.url);

    return NextResponse.redirect(dashboard);
  }
};

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};