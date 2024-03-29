# NodeJS-Express-API


stacks: NodeJs, Express and with google mail api.
```js
https://secure-crag-48354.herokuapp.com/api/v1
```

# User Auth
User Registration  

```js
/*
* @description: Register the email address and password to the database
* @description: POST method 
* @parameter {String} username - valid email address of the user
* @parameter {String} password - min of at least 6 characters.
*/

var axios = require('axios');
var data = JSON.stringify({
  "username": "sample@email.com",
  "password": "yourpassword"
});

// sample axios request 
var config = {
  method: 'post',
  url: `https://secure-crag-48354.herokuapp.com/api/v1/register`',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
```json 
{
  "success": true,
  "message": "Pending account. Please verify your email"
}
```
Verifying your Email (After Successful Registration)

```js 
/*
* @description: After the successful registration, a unique link will be sent your registered email to verify your account. 
* @description: GET method 
*/

var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://secure-crag-48354.herokuapp.com/api/v1/confirm/email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzcGlub3NhaXJhYnVubnlAZ21haWwuY29tIiwiaWF0IjoxNjMxOTgyNTI4LCJleHAiOjE2MzE5ODYxMjh9.u5__K1WrZJYFWxySnmR0fYbMkdFHmUMzIZAiOoGLa2s',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
If verifying is success then it will redirect you to the login page of the front end.
```json
{
  "success": true
}
```
---
User Login
```js
/*
* @description: POST method 
* @parameter {String} username - registered email address
* @parameter {String} password
*/

var axios = require('axios');
var data = JSON.stringify({
  "username": "emailaddress@email.com",
  "password": "password"
});

var config = {
  method: 'post',
  url: 'https://secure-crag-48354.herokuapp.com/api/v1/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
After the successful login, an access token will be provided.
This token will be used in accessing protected endpoints and its only good for 1 hour only.
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaXJhYnVubnllc3Bpbm9AeWFob28uY29tIiwidXNlcmlkIjoiNjE2MTlkOGVjNzQxZDIzMjYxNmU0ZTc1IiwiaWF0IjoxNjMzODUyMTg3LCJleHAiOjE2MzM4NTU3ODd9.EJg6SV-AP1Xyjon8HY81ETzJafCaMGihUvTqds2coZE"
}
```
---
User Logout
```js
/*@description: Revoke access to the endpoint
* @description: POST method 
* @parameter {String} id - the user objID
*/

var axios = require('axios');
var data = JSON.stringify({
  "id": "61619d8ec741d232616e4e75"
});

var config = {
  method: 'post',
  url: 'https://secure-crag-48354.herokuapp.com/api/v1/logout',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaXJhYnVubnllc3Bpbm9AeWFob28uY29tIiwidXNlcmlkIjoiNjE2MTlkOGVjNzQxZDIzMjYxNmU0ZTc1IiwiaWF0IjoxNjMzODUyMTg3LCJleHAiOjE2MzM4NTU3ODd9.EJg6SV-AP1Xyjon8HY81ETzJafCaMGihUvTqds2coZE', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
```json
{
    "success": true
}
```
---
Forgot Password
```js
/*
* @description: Notify the app that the user forgot her/his password
* @description: POST method 
* @parameter {String} username - registered email
*/

var axios = require('axios');
var data = JSON.stringify({
  "username": "email@email.com"
});

var config = {
  method: 'post',
  url: 'https://secure-crag-48354.herokuapp.com/api/v1/forgot-password',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
```json
{
    "success": true,
    "message": "Reset link has been sent to your email."
}
```
---
Reset Password (After forgot password, a unique link will send automatically to your email)
```js
var axios = require('axios');
var data = JSON.stringify({
  "password": "newPasswordAgain"
});

var config = {
  method: 'post',
  url: 'http://localhost:5000/api/v1/reset-password',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYxNjE5ZDhlYzc0MWQyMzI2MTZlNGU3NSIsImlhdCI6MTYzMzg1MTc0NSwiZXhwIjoxNjMzODUyNjQ1fQ.kUryFPGM2EN9QEHdXnFylX35z3C8eEUUB7xeAipY0e0', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
```json
{
    "success": true
}
```




