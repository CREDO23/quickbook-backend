# Quickbook-api
Allow you to keep track financials functions like incomes , expenses , invantory and can generate a report

### Register endpoint [POST].
This endpoint allows user to create an account. It takes an `JSON` object containing at least the required information ( username, email adress, password and phone number ) : 

+ Request `(application/json)`
```javascript
   {
     "username" : "CREDO23",
     "password" : "credo23",
     "email" : "bakerathierry@gmail.com",
     "phoneNumber" : "0970721888"
   }
```

+ Response 200 `(application/json)`
```javascript
   {
     "message": "Account created successfully",
     "data": {
        "user": {
            "id": "af69d904-acdf-4d82-a198-3b9f53e80eaa",
            "username": "CREDO23",
            "email": "bakerathierry@gmail.com",
            "phoneNumber": "0970721888",
            "isOnline": false,
            "firstname": null,
            "lastname": null,
            "avatar": null,
            "proffession": null,
            "description": null,
            "gender": null
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNSRURPMjMiLCJpZCI6ImFmNjlkOTA0LWFjZGYtNGQ4Mi1hMTk4L
                       TNiOWY1M2U4MGVhYSIsImlhdCI6MTY3NTA3MjkzMCwiZXhwIjoxNjc1Njc3NzMwfQ._XBbWYwG7go19hNrkrnRbb0QiwiY6FsmjUAnV7T1x78"
    },
     "error": null,
     "success": true
   }
```

### Login [POST].
This endpoint allows user log in and get an access token . It takes an `JSON` object containing the email adress and the password .

+ Request `(application/json)`
```javascript
   {
     "password" : "credo23",
     "email" : "bakerathierry@gmail.com",
   }
```

+ Response 200 `(application/json)`
```javascript
   {
     "message": "Logged in as bakerathierry@gmail.com",
     "data": {
        "user": {
            "id": "af69d904-acdf-4d82-a198-3b9f53e80eaa",
            "username": "CREDO23",
            "firstname": null,
            "lastname": null,
            "email": "bakerathierry@gmail.com",
            "avatar": null,
            "proffession": null,
            "description": null,
            "gender": null,
            "isOnline": false,
            "phoneNumber": "0970721888",
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzUwNzM4MjIsImV4cCI6MTY3NTY3ODYyMn0.ww3gFNYDqQG16LSHWZ
                        IrH1uWCo5JUnlpd6IyeRbvbio"
     },
     "error": null,
     "success": true
   }
