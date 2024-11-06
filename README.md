This is a [Next.js 15](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is built with Next.js 15, NextAuth v5, Redux Toolkit / RTK Query

## Getting Started

First, run the development server:

Due to React 19, many libraries have not listed React 19 as a peer dep as of now. Please use `pnpm` or use `--force` if you want to use `npm`.

Reference: https://ui.shadcn.com/docs/react-19

```bash
npm i --force
npm run dev
# or
pnpm i
pnpm run dev
```

## User Journey

1. When user loads the page for the first time, middleware will detects the unauthenticated request and user will be redirected to the Google sign in page to authenticate.
2. Upon redirecting, session cookies will be attached to the HTTP requests to `/api/users` to retrieve the list of users.
3. Business logic to filter out users are done on the Route Handler. Returns list of users to FE.
4. List of users are stored in Redux slice and are cached.
