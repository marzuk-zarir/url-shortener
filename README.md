# URL Shortener Api

User wise url shortener api. User can sign up with username and email address. Login with their username and password then add or remove their shorten url link. All created url is public 😌

# How to run:

## First install dependencies

```sh
npm i
```

## Set Environment Variables

```sh
HOSTNAME=YOUR_SERVER_HOSTNAME # https://example.com
DB_URL=YOUR_MONGODB_URL # remote or local
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRE_IN=YOUR_JWT_EXPIRE_IN # example 40s, 30m, 1h, 365d
```

## Start in development

```sh
npm run dev
```

## Start in production

```sh
npm start
```

Sever is listening on http://localhost:3000

## Api Structure

Auth Route

```http
POST         /api/v1/auth/signup
POST         /api/v1/auth/login
```

Url Route

```http
GET         /api/v1/shorten/
POST        /api/v1/shorten/
DELETE      /api/v1/shorten/:urlId
```

## Technology:

Server:

-   Express js
-   Mongoose
-   JsonWebToken
-   Bcrypt
-   Nanoid
-   Joi
-   Config
-   Dotenv

## Contact

Email: [Marzuk Zarir](mailto:business.marzukzarir@gmail.com)
