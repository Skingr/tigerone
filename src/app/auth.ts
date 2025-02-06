
import NextAuth from "next-auth";

export const { handlers, auth, signIn } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // explicit set scret
  providers: [
    {
      id: "canvas",
      name: "canvas",
      type: "oauth",
      authorization: {
        url: "https://coloradocollege.instructure.com/login/oauth2/auth",
        params: {
          response_type: "code", // canvas docs say this needs to be code
          scope: "url:GET|/api/v1/courses", // canvas docs say this is important?
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/canvas`
        }
      },
      token: {
        url: "https://coloradocollege.instructure.com/login/oauth2/token"
      },
      userinfo: {
        url: "https://coloradocollege.instructure.com/api/v1/users/self/profile"
      },
      // These will be provided by the route handler
      clientId: process.env.NEXT_PUBLIC_CANVAS_CLIENT_ID,
      clientSecret: process.env.CANVAS_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile.login_id,
          name: profile.name,
        };
      },  
    }
  ],
  callbacks: { async redirect({ url, baseUrl }) { return baseUrl }, }, // maybe would work?




});
