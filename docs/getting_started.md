# Getting Started - *how to use this API*

![Manic Street Preachers including Richey Edwards](https://guitar.com/wp-content/uploads/2021/09/manic-street-preachers@1400x1050-1068x801.jpg)

!> **Please Note** You must first sign up and log in as a user to make use of this API

## Authorization
- Open up Postman, or a similar program
- Go to **/users/signup** this is a POST request
- In the body of the request, enter a unique username and a password
- Click send


```json
{
    "message": "User created",
    "token": "<YOUR TOKEN WILL APPEAR HERE>"
}
```

- Once you have logged in, you will receive a token in the response that you can use in your authorization header to access the API endpoints.

## Logging Out
- To log out, go to **/users/logout** this is a GET request






