# Fly.io Simple Monorepo Demo

This is a simple monorepo demo to showcase how to deploy multiple apps to fly.io using one Dockerfile.

## What's inside?

In the monorepo you'll find 2 apps and 4 packages

### Apps and Packages


#### Apps
- [`api-gateway`](/apps/api-gateway/): an [express.js](https://expressjs.com/) server that proxies 2 enpoints.   
   
   **Endpoints**
    - [/web-server](/apps/web-server/)
    - [/yoda]("https://funtranslations.com/api/yoda")

- [`web-server`](apps/web-server/): another [express.js](https://expressjs.com/) app that just returns the current path that a user enters

Each app/package is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


### Setup

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

1. Install and setup [flyctl]()

2. Create apps first before deploying

```console
$ fly apps create api-gateway

$ fly apps create web-server
```

3. Check that the app variable name in the `fly.[app-name].toml` file is the same name you used to create the app in the previous step

```
# fly.gateway.toml
app = "monorepo-demo-web" <- this line
primary_region = "lax"
...
```

4. Also check that the `PROJECT` arg in the `fly.[app-name].toml` file (located in the `[build.args]` section) is the same name as your app folder. 

```
#fly.gateway.toml
...
[build.args]
  PROJECT="api-gateway" # This should match the app name folder
...
```

![App Name Screenshot](https://github.com/HelixHex/fly-monorepo-demo/app_name_screenshot.png)

5. Deploy to [fly.io](https://fly.io)
```console
$ fly deploy --config fly.gateway.toml
$ fly deploy --config fly.web.toml
```