# kagari

kagari is a minimal note application and it's my playground for hono.

## tools

api (backend):

- langueage & framework: typescript, hono
- runtime: node.js
- database & orm: sqlite, drizzle orm
- schema validation: valibot
- testing: vitest
- compile: tsc

web (frontend):

- langueage & framework: typescript, hono/client
- styling: css modules
- build: vite

## requirements

- node.js >= 22.x
- pnpm >= see engines section in package.json
- sqlite >= 3.x

## usage

install on local:

```
cd path/to/somewhere
git clone https://github.com/jamband/kagari.git
cd kagari
pnpm i
```

setting up a development environment:

```
pnpm -F api dev
pnpm -F web dev
```

running the tests:

```
pnpm test
```

build to staging environment:

```
pnpm build
pnpm preview
```

## about environment variables

api:

- the development environment uses `.env` and `db/development.db`
- the testing environment uses `.env.testing`
- the staging environment uses `.env.staging` and `db/staging.db`

web:

- the development/staging environment uses `.env`

> [!NOTE]
> this repository uses `.env.staging` in the staging environment for convenience, but do not do this in the production environment (such as creating and using .env.production).
