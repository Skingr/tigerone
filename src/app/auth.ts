import NextAuth from "next-auth";
 

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    {
      id: "canvas",
      name: "Canvas",
      type: "oauth",
      authorization: {
        url: "https://coloradocollege.instructure.com/login/oauth2/auth",
        params: {
          response_type: "code",
          
          scope: "url:GET|/api/v1/courses" // canvas docs say this is important?
        }
      },
      token: {
        url: "https://coloradocollege.instructure.com/login/oauth2/token"
      },
      userinfo: {
        url: "https://coloradocollege.instructure.com/api/v1/users/self/profile"
      },
      clientId: process.env.CANVAS_CLIENT_ID,
      clientSecret: process.env.CANVAS_CLIENT_SECRET,
      async profile(profile) { // may get problems here, should change to what canvas has. 
        return {
          id: profile.login_id,
          name: profile.name,
        };
      }
    }
  ]
});
