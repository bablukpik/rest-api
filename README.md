# REST API
This is a simple CRUD project using Nodejs, Expressjs, & Mongoose with JWT and BCRYPT.
## Setup
Create a `.env` file first at the root of the project and add some environment veriables like this

```
PORT=8000
ACCESS_TOKEN_SECRET=abcdasdf
REFRESH_TOKEN_SECRET=abcdffa

```

npm install

npm run start-watch

## The following table shows the overview of the Rest APIs:
```
| Methods  | Urls | Actions |
| ------------- | ------------- |
| POST | /api/auth/signup | Create user |
| POST | /api/auth/login | Authenticate user |
| GET | /api/users/me | Get authenticated user details |
| POST | /api/stuff | Create stuff |
| GET | /api/stuff | Get all stuff |
| GET | /api/stuff:id | Get a stuff |
| PUT | /api/stuff:id | Update a stuff |
| DELETE | /api/stuff:id | Delete a stuff |
```
