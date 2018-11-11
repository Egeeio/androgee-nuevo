# androgee-nuevo [![Discord](https://discordapp.com/api/guilds/183740337976508416/widget.png?style=shield)](https://discord.gg/F6DhWg)

[![Maintainability](https://api.codeclimate.com/v1/badges/2d87d680839993efc3e8/maintainability)](https://codeclimate.com/github/Egeeio/androgee-nuevo/maintainability)
[![CircleCI](https://circleci.com/gh/Egeeio/androgee-nuevo.svg?style=svg)](https://circleci.com/gh/Egeeio/androgee-nuevo)

Androgee is a good natured Discord bot with hooks into an accessible Docker Engine. It allows admins in a Discord server to interact with Docker containers via standard bot commands.

## Built with 💖 and

- [TypeScript](https://www.typescriptlang.org/)
- [DiscordJS](https://discord.js.org/#/)

## Hosting

Androgee is built for the Egee.io community, however the bot is generic enough that you can easily self-host it on your own server. You just need to export an environment variable named `TOKEN` with the value of your API key. More information on hacking on the bot can be found below 👇

## Contributing & Hacking

Androgee is a relatively simple Discord bot written with TypeScript & DiscordJS. It uses Dockerode to communicate with the Docker Engine running on the Egee.io server but it's not required for the bot to run, and you can leave the configuration for it blank.

TypeScript is a language the _compiles_ into JavaScript. As such, after you edit _any_ file under the `./src` directory, you will need to compile it using the `npm run build` command. Check out the `scripts` section in the `package.json` for a full list of available build commands.

You only need to install NodeJS 8+ to run Androgee. TypeScript and all other dependencies are installed via `npm install`. The TypeScript compiler is configured in the `tsconfig.json` file but you shouldn't need to make changes to it.

If you want to contribute code to Androgee, fork this repo, make your changes, and submit a PR. You can also create a new issue on this repo too 👍
