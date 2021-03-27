# GoodHub
Central portal promoting and enabling projects and organisations that are working to improve lives.

This is the main monorepo for GoodHub which contains both the backend and the front end. Currently any code or types that are shared between the two are located in [`@strawberrylemonade/goodhub-lib`](https://github.com/strawberrylemonade/goodhub-lib) as a separate library. [See here for more info.]()

## Getting started with development
Ensure you have git and node installed ([nvm](https://github.com/nvm-sh/nvm) is my favourite way).

Clone this repo, then run `npm install` in the `/ui/goodhub-app`, `/server/microservices` and `/server/core` directories.

GoodHub uses a control plane called Backstage that helps manage cross-project settings, configuration and feature flags. Think environment variables on steroids but can be much more dynamic. You can find it, and it's usage [here.](https://github.com/strawberrylemonade/backstage) The important thing is that you need to define a environment variable in a `.env` file at root of your project.

```
REACT_APP_BACKSTAGE_URL=backstageId
BACKSTAGE_URL=backstageId
```
Configure your own backstage instance [here](https://backstage.lemonade.fyi) by using the `goodhub.backstage.json` file in the project.

### UI
There are actually two entry points/build targets for this react app, one for the main GoodHub app and one for the external organisation website.

To start local development of the main GoodHub UI run: `npm run main`

To start local development of the organisation website: `REACT_APP_ORGANISATION=orgId npm run external` with `orgId` being the id of the organisation you are wanting to build off.

If you don't want to run a local server and just want to develop the UI off the development API you can append the command with `:dev`, e.g. `npm run main:dev` and `npm run external:dev`.

### Server
The server is pretty straightforward to start, just run `npm run start`. 