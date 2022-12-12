# Next.js 13+ base app built for TypeScript and GraphQL

The objectif of this repository is to track my progress with setting up Next.js 13 for a graphql with a solid foundation.

## Initial app creation and setup

I went for the default [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Only adding the `--experimental-app` flag since we are going for the new Next 13 features.
Make sure to pick `TypeScript` and `ESlint` options.

```bash
yarn create next-app next-13-graphql --experimental-app
```

### Git flow

Git flow is just so good, here is a few aliases I use:

```bash
# git flow aliases
alias gffs 'git flow feature start'
alias gfff 'git flow feature finish'
alias gfrs 'git flow release start'
alias gfrf 'git flow release finish'
alias gfhs 'git flow hotfix start'
alias gfhf 'git flow hotfix finish'
```

This will give me a good commit history that I can refer back to later when I wonder why or how I did something :)
Always start a new feature before working on something, heck even this first edit of the `README.md` woudl be done in a new feature.
As easy as `gffs folder-structure`

### Moving to a src folder

I much rather have my app code in it's own source folder, since it also needed a change in `tsconfig.json` I just copied over a more extensive configuration.

```
Project
└───src
│   └───app
│   └───components
│   └───core
│   └───lib
```

The way to look at it is `core` is helpers/functions that could go in any project, `lib` are queries and other libs related to the project.

### Prettier

I like not worrying about code formatting and having something very opinionated such as [Prettier](https://prettier.io/) handle it fits me just fine!

```bash
yarn add -D -E prettier eslint-config-prettier
```

Copied over defaults I liked in a `.prettierrc.json` and `.prettierignore` that should roughly match `.gitignore`.
Now we also need to have eslint actually use prettier in it's config. This is when I also copy over an `.eslintrc.json` with prettier configured and rules to prevent components being imported the _wrong_ way. Take a look and it makes sense.

### lint-staged and husky

Now lets push this whole pretty linting to the next level by creating a git hook to make sure all checks are passed before any commit is accepted!

```bash
yarn add -D -E lint-staged
```

### lint-staged and husky

Now lets push this whole pretty linting to the next level with [okonet](https://github.com/okonet)/**[lint-staged](https://github.com/okonet/lint-staged)** and [typicode](https://github.com/typicode)/**[husky](https://github.com/typicode/husky)** by creating a git hook to make sure all checks are passed before any commit is accepted, force your linting rules!

```bash
npx husky-init
yarn install
yarn add -D -E lint-staged
```

Check the new `.lintstagedrc` config and `.husky/pre-commit` for a list of all the checks being run.

Dont forget to edit the `.git/config` file for the new path for hooks. Set the `hook` value for `[gitflow "path"]` to `.husky`.

## GraphQL

### graphql-request

[prisma-labs](https://github.com/prisma-labs)/**[graphql-request](https://github.com/prisma-labs/graphql-request)** is a lean GraphQL client based on fetch and is all we need.

```bash
yarn add -E graphql-request graphql
```

And we add a `.graphql.yml` to make sure vscode wont miss query tags in `ts/tsx` files.

### .env and .env.local files

This will be our first use for a `.env` file. Make a copy and name it `.env.local` with your correct values. There is a different value for the schema and the endpoint in case you need to use a different source for `graphql-codegen`

```bash
BASE_API_URL=http://localhost:1337
GRAPHQL_SCHEMA=http://localhost:1337/graphql
GRAPHQL_ENDPOINT=http://localhost:1337/graphql
GRAPHQL_API_KEY=
```

### graphql client

Our first `core` library, a `graphqlClient` we can use to make our queries.

### graphql-codegen

[GraphQl Codegen](https://the-guild.dev/graphql/codegen) makes having a fully Typed graphql api a breeze.

```bash
yarn add -D -E @graphql-codegen/cli @graphql-codegen/client-preset
```

Once again dropping a `codegen.ts` config that matches this directory structure

```
Project
└───src
│   └───lib
|   │   └───gql
```

And a new script `yarn codegen` in `packages.json` to start our watcher in charge of generating graphql queries Types.

Note the use of `process.env.GRAPHQL_SCHEMA` in `codegen.ts` for the schema url.

### Tailwindcss

[Tailwindcss](https://tailwindcss.com/) is by far the new cool kid on the css frameworks block, and I like it :)

```bash
yarn add -D -E tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Copy the correct configuration into `tailwind.config.js` and add the imports in `./src/app/global.css`.
Forgot to add the `Poppins` font at that point, so it will be done in the next feature, `global-query`, if you need to check the commit history.

## Strapi config

At this point I would add my strapi template to have a graphql api to work with but the create-strapi app is broken atm.

## Server Component GraphQL query

### Query global metadata for the Head component

We create our first `GraphQL query` and `graphqlClient request` in `./src/lib/getGlobalData.ts` while making sure `yarn codegen` is running so it can do its magic.
We now make the function `async` in `./src/app/head.tsx` and import our new `getGlobalData` request and bob's your uncle! Types are all handled, beauty!
A special function to fetch media from the Strapi api is also needed, also a good time to add image domains that should be authorized in `next.config.js`.

## Navbar with query

### Navbar Components

Let's start by setting up our initial files and modify the `./src/app/layout.tsx` to inclue our new `./src/components/Header.tsx` which then loads the `./src/components/Navbar/Navbar.tsx`, which in turns loads the mobile and desktop navbar components. Check the trick with the `index.ts` in that folder for cleaner imports.

### Query Navbar data

Create a new `./src/lib/getNavigationData.ts` query and graphqlClient request associated to it. We will fetch this data in Navbar to feed it to a context api provider.

### Navigation data fetching

Next.js 13 docs recommend colocating data fetching alongside it's consumer since [`fetch` requests are automatically deduped](https://beta.nextjs.org/docs/data-fetching/fundamentals#automatic-fetch-request-deduping) in Server Components.

So we'll be using the `getNavigationData` in Server Components, namely `Navbar` and `NavDesktop`. Client Components such as `NavMobile`, `NavLink` and `NavDropdown` will get their data serialized via props from `Navbar` or `NavDesktop`.

We also installed [tailwindlabs](https://github.com/tailwindlabs)/**[headlessui](https://github.com/tailwindlabs/headlessui)** along the way, also a reason for having to use Client Components.

Lots going on so comments in the code at each commit step are here to help!

## Original README.md

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
