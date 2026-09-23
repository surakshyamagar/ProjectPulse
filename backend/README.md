cd backend
node -v
npm -v

npm init -y
npm install express cors helmet morgan
later: cookie-parser bcrypt jsonwebtoken zod

(prisma install)
npm install @prisma/client@6
npm install -D prisma@6
(initialize Prisma:)
npx prisma init

(after model created)
npx prisma migrate dev --name init
npx prisma generate

(TypeScript/dev tools:)
npm install -D tsx
npm install -D typescript tsx @types/node @types/express @types/cookie-parser @types/bcrypt @types/jsonwebtoken @types/cors @types/morgan

(Initialize:)
npx tsc --init
npx prisma init

.env

npm install zod


> NOTE
1. .ts = source file you write
2. .js = runtime file Node expects

3. ESM-style imports.

4. bcrypt          → password hashing
    jsonwebtoken    → JWT
    cookie-parser   → read HTTP-only cookies
    zod             → validate request data
    Prisma          → database

5. COOKIE => A cookie is a small piece of data that the server asks the browser to store.

            eg; 
            Browser, please store this:
            token/jwt = abc123 in cookie

        >   LOGIN
            User → Server
                ↓
            JWT/token created
                ↓
            Cookie sent
                ↓
            Browser stores cookie


            LATER REQUEST
            Browser → Server
                    ↓
                Cookie
                    ↓
                Server knows
                who the user is

6. httpOnly: true cookie => React JavaScript in browser cannot directly read this cookie.

            React JavaScript
                ❌ cannot read JWT

            Browser
                ✅ can send cookie

            Backend
                ✅ can read cookie