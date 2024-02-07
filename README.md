# [Fly.io](https://fly.io) Simple Monorepo Demo

This is a simple monorepo demo to showcase how to deploy multiple apps to fly.io using one Dockerfile.

## What's inside?

In the monorepo you'll find 2 apps and 4 packages


## Apps
- [`api-gateway`](/apps/api-gateway/): an [express.js](https://expressjs.com/) server that proxies 2 enpoints.   
- [`web-server`](apps/web-server/): another [express.js](https://expressjs.com/) app that just returns the current path that a user enters

## Packages
- [`db`](/packages/db): A [prisma](https://prisma.io) package to globally use prisma. Check out this [article](https://turbo.build/repo/docs/handbook/tools/prisma) to learn more

## Utilities
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


## Setup

Install Dependencies

```sh
npm install
```

### Run

```sh
npm run dev
```

### Build
```sh
npm run build
```

### Deploy

#### Install and setup [flyctl]()

#### Create apps first before deploying

```console
$ fly apps create api-gateway

$ fly apps create web-server
```

Check that the app variable name in the `fly.[app-name].toml` file is the same name you used to create the app in the previous step

```
# fly.gateway.toml
app = "monorepo-demo-web" <- this line
primary_region = "lax"
...
```


Also check that the `PROJECT` arg in the `fly.[app-name].toml` file (located in the `[build.args]` section) is the same name as your app folder. 

```
#fly.gateway.toml
...
[build.args]
  PROJECT="api-gateway" # This should match the app name folder
...
```

![App Name Screenshot](https://github.com/HelixHEX/fly-monorepo-demo/blob/main/app_name_screenshot.png?raw=true)

#### If you're using prisma. Uncomment line 39 to generate types before the buid step 


#### Deploy to [fly.io](https://fly.io)
```console
$ fly deploy --config fly.gateway.toml

$ fly deploy --config fly.web.toml
```