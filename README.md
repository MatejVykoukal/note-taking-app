# Note.it - note taking app

Web application that allows you to take notes.

## Live demo

<https://note-taking-app-production-0a20.up.railway.app/notes>

## Start local development server

### Prerequisites

You need to have Node.js version specified in `.nvmrc`(18.7.0). In case use don't have this version I'd suggest using [Node Version Manager](https://github.com/nvm-sh/nvm) for Linux/Mac or [NVM for Windows](https://github.com/coreybutler/nvm-windows).

To use specific version of Node just run `nvm use` on Linux/Mac or `nvm use 'cat .nvmrc'` on Windows(git-bash).

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Docker Compose

This will run a PostgreSQL database. Install [Docker Desktop](https://docs.docker.com/desktop/) to make this work. It includes [Docker Engine](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/). You can install them manually if you prefer to not use [Docker Desktop](https://docs.docker.com/desktop/).

```bash

docker compose up

```

<!-- TODO: Invite other devs from WDJ discord to contribute :) -->

<!-- TODO: Rework note creation cycle - go  custom "create modal" way. -->
<!-- TODO: Rework note list layout -->
<!-- TODO: Add error handling for invalid inputs -->
<!-- TODO: Add ability to do CRUD acctions on notes -->
<!-- TODO: Save notes in DB(browser or server) to presist them. -->
<!-- TODO: Allow only authed users to access the features -->
<!-- TODO: Add tech info about project to README -->
