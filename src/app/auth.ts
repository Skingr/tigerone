import NextAuth from "next-auth";
 
export const { handlers, auth, signIn } = NextAuth({
  providers: [{
    id: "canvas", // signIn("canvas") and will be part of the callback URL
    name: "canvas", // optional, used on the default login page as the button text.
    type: "oauth", // or "oauth" for OAuth 2 providers
    issuer: "https://coloradocollege.instructure.com", // to infer the .well-known/openid-configuration URL
    clientId: process.env.CANVAS_CLIENT_ID, // from the provider's dashboard
    clientSecret: process.env.CANVAS_CLIENT_SECRET, // from the provider's dashboard
  }],
});
//Then, set the callback URL in your provider’s dashboard to https://app.com/{basePath}/callback/{id}.
// By default, basePath is /api/auth for Next.js, and /auth in all other integrations. See basePath.

