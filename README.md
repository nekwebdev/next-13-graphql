# Next.js 13+ base app built for TypeScript and GraphQL

The objectif of this repository is to track my progress with setting up Next.js 13 for a graphql with a solid foundation.

## Initial app creation and setup

I went for the default [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Only adding the `--experimental-app` flag since we are going for the new Next 13 features.

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
