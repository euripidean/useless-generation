# Getting Started
This is a quick guide to get you started using the API.

!> **Please Note** You will need to register an account and get an API key to use this API.
  - Open up postman 
  - Go to /api/v1/spicegirls/signup
  - In the body of the request, enter a username, password, and email
  - Click send
  - You will receive an API Key in the response
  ```json
  {
    "message": "User created successfully",
    "apiKey": "1234567890"
  }
  ```


## API KEY
> You need an API key to access any edit endpoints.

You can authenticate your requests by passing your API key in the `Authorization` header or by adding it as a query parameter.

<div style='color: green'>
GET /api/v1/spicegirls&api_key=YOUR_API_KEY
</div>

## Authentication

> Once you register for an account, you can access your API key from your dashboard.

You can authenticate your requests by passing your API key in the `Authorization` header.

```http
GET /api/v1/spicegirls HTTP/1.1
GET /api/v1/spicegirls/1 HTTP/1.1
```
