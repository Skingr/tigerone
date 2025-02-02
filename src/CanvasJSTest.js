// active courses
//const API_URL = "https://coloradocollege.instructure.com/api/v1/courses?enrollment_state=active"


const API_URL = "https://coloradocollege.instructure.com/api/v1/courses"


require("dotenv").config({ path: ".env" });
CANVAS_API_KEY = process.env.CANVAS_API_KEY;


function getCurrentCourse(){
    const url = "https://coloradocollege.instructure.com/api/v1/users/self/enrollments"
    fetch(url, {
    headers: {
        'Authorization': `Bearer ${CANVAS_API_KEY}`,
    },
    }).then(response => response.json())
        .then(data => {
            // find most recent course
            current_max = 0;
            current_course = null;
            for (let i = 0; i < data.length; i++){
                const course = data[i]
                // don't include null
                
                last_activity = course.last_activity_at
                if (last_activity == null){
                    last_activity = "0"
                }
                
                last_activity = last_activity.replaceAll("-", " ")
                last_activity = last_activity.replaceAll(" ", "")
                if (parseInt(last_activity) > current_max){
                    currentMax = last_activity
                    current_course = course
                }
            }
            // current_course is ya current course. This needs to be tweaked somehow, maybe crosscheck possible
            // classes
            console.log(current_course.user.name, ", ", current_course.user.login_id, ",", current_course.course_id)
            
            
        });
}
getCurrentCourse()

    
/** 
// Source: Medium.com
// AUTH FLOW: 
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
