# Note.it - note taking app

Web application that allows you to take notes.

## Live demo
> Demo is currently unavailable. We are working on fixing that!

<https://note-taking-app-production-0a20.up.railway.app/notes>

## Start local development server

### Prerequisites

#### Node.js

You need to have Node.js version specified in `.nvmrc`(18.7.0). In case use don't have this version I'd suggest using [Node Version Manager](https://github.com/nvm-sh/nvm) for Linux/Mac or [NVM for Windows](https://github.com/coreybutler/nvm-windows).

To use specific version of Node just run `nvm use` on Linux/Mac or `nvm use 'cat .nvmrc'` on Windows(git-bash).

#### Docker

Install [Docker Desktop](https://docs.docker.com/desktop/) to local DB work.

It includes [Docker Engine](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/). You can install them manually if you prefer to not use [Docker Desktop](https://docs.docker.com/desktop/).

#### Env variables

To make app working locally you also need to have env variables set. Duplicate file `.env.example` and rename it to `.env`, then follow instruction there to set the variables correctly.

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Start the DB

The Postgre DB runs in docker container. To start it run the following command:

```bash
docker compose up
```

If you have correctly set the env variables, the DB is hooked to the app. You need one more thing. Synchronize the DB with the Prisma Schema's. You can achieve that by running command:

```bash
npx prisma db push
```
