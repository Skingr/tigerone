// active courses
//const API_URL = "https://coloradocollege.instructure.com/api/v1/courses?enrollment_state=active"


const API_URL = "https://coloradocollege.instructure.com/api/v1/courses"
const COURSE_ID = 45070
// my access token


// require("dotenv").config({ path: ".env.local" });
// const CANVAS_API_KEY = process.env.CANVAS_API_KEY;
// console.log(CANVAS_API_KEY)

require("dotenv").config({ path: ".env.local" });
CANVAS_API_KEY = process.env.CANVAS_API_KEY;

// To get syllabus of CP499
const url = `${API_URL}/${COURSE_ID}?include[]=syllabus_body`;


fetch(url, {
  headers: {
    'Authorization': `Bearer ${CANVAS_API_KEY}`,
  },
}).then(response => response.json())
    .then(data => console.log(data));

/**
Source: Medium.com
 1. Request URL: http://<canvas-instance-url>/login/oauth2/auth
HTTP Method: GET
Parameters:
client_id: The Client ID obtained from your Canvas developer key.
response_type: Set this to code.
state: A random string to maintain state.
redirect_uri: The callback URL you specified earlier.
scope: The scope of access required. For example, url:GET|/api/v1/accounts.
*/
/**
2. Request URL: http://<canvas-instance-url>/login/oauth2/token
HTTP Method: POST
Headers:
Content-Type: application/x-www-form-urlencoded
Body:
grant_type: authorization_code
client_id: The Client ID obtained from your Canvas developer key.
client_secret: The Client Secret obtained from your Canvas developer key.
redirect_uri: The same redirect URI used in the authorization request.
code: The authorization code obtained from the callback URL. (appended to URL)

3. Request URL: http://<canvas-instance-url>/api/v1/users/self
HTTP Method: GET
Headers:
Authorization: Bearer accessToken (replace accessToken with token from previous step) (like what's done above)
 * 
 */
