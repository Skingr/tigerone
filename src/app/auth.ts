import NextAuth from "next-auth";
 
export function firstGetRequest(){
  const CLIENT_ID = process.env.CANVAS_CLIENT_ID
  const SECRET_ID = process.env.CANVAS_CLIENT_SECRET
  const STATE = "RANDOMSTATE"
  const REDIRECT = encodeURIComponent("http://localhost:3000/api/auth/callback/canvas")
  const url = `https://coloradocollege.instructure.com/login/oauth2/auth?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=http://localhost:3000/api/auth/callback/canvas`
  fetch(url, {
    method: 'GET',
    redirect: 'follow'
  }).then(response => console.log(response)

  ).catch(function(err) {
    console.info(err + " url: " + url);
});
}

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    {
      id: "canvas",
      name: "Canvas",
      type: "oauth",
      authorization: {
        url: "https://coloradocollege.instructure.com/login/oauth2/auth",
        params: {
          response_type: "code", // canvas docs say this needs to be code
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
      async profile(profile) { // Should be how you access info? Maybe change userInfo url to …/self/enrollments to get course
        return {
          id: profile.login_id,
          name: profile.name,
        };
      },  
    }
  ]
});
