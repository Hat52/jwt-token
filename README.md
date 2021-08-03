# jwt-token
jwt token implemented using node js 

in this project I just implemented the jwt token based api authentication and also used the refresh api to refresh the expired tokens

our setver is running on port 4000

for login and generation the toke use this api
http:localhost:4000/login
body{
email:'email@test.com'
password:'password'
}
it will return a status and token and a refresh token
for example
on success it will return 
{
    "status": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjI3OTk5NDAxLCJleHAiOjE2Mjc5OTk0NjF9.WtYno8GSGMFeJ9bM5-ykKaPeRoMtWYZtaOY0IJhJQQY",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjI3OTk5NDAxfQ.u9sOx0_F81SQVdqDnGetUw8bzbBtyHJCLn-ULoiWR-c"
}
on failure it will retun this
{
    "status": false,
    "message": "unable to find user"
}

now to check if our token is working fine use the api http://localhost:4000/test
body{
token:token that is returned by the login api
}
the token will be available for only one minute

and now to refresh the token usr the api http://localhost:4000/test
body{
refreshToken:refreshToken that is returned by the login api
}

