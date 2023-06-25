# GoodHub

GoodHub is a new charity that provides free, easy-to-use digital tools for community organisations.

Digital tools can transform an organisation's efficiency, communication and effectiveness. But let's be real - they can also infuriate, confuse and waste vast amounts of time!

Built by I.T professionals, GoodHub's aim is to give all the benefits of digital tools with none of the drawbacks. From branding to HR, funding to volunteer management, GoodHub plans to have everything a smaller charity or voluntary organisation needs, so that they can concentrate on improving the lives of local people.

## Contributing

Thank you for wanting to take part in building GoodHub, we appreciate your interest and thank you in advance for contributing to this project!

We want to make sure we can get you started right away so you can:

- Look through our contributing documentation [WIP]
- Have a look at our current list of “good first contribution” issues
- Book a call in with one of our volunteer developers here to get you set up and ask your questions. [Pick a slot here](https://cal.com/changesbyjames/getting-started).

As one our volunteer developers, we have two ways of rewarding you for your time:

- Swag! A rotating selection of standard tech swag that you can stick, wear or otherwise rock.
- As great experience working in open source and a reference on your CV. If you become a regular contributor we would be happy to be a phone reference for you.

## Getting started

- Ensure you have git installed
- Ensure you have Node & NPM installed. NVM is a good way to do this. [(windows)](https://github.com/coreybutler/nvm-windows)
  [(mac/linux)](https://github.com/nvm-sh/nvm)
- Install the [Infisical CLI](https://infisical.com/docs/cli/overview). We use this for managing development environments and sharing hosted dependencies. If you haven't been issued an account yet, please raise an issue using [this template.](https://github.com/goodhub/goodhub/issues/new?title=Development%20Environment%20Setup)

Use `infisical login` to link your account. Note: If you are doing this in a codespace do `infisical vault set file` before logging in!

In the root of the monorepo, run:

- `npm install`
- `npm run setup`
- `infisical run -- npm run start`

The UI & the API should start up with default ports of 3000 & 3001 respectively.
