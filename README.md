# GraphQL Federation Monorepo

This repo is an example of a monorepo project that demonstrate GraphQL federation.

## Pre-requisite

- [Visual Studio Code](https://code.visualstudio.com/Download)
- Docker
- [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

## Get Started

Create a `.env` file following the `.env.template` with valid API keys.
Open the project in vs code and re-open in containers.
Inside VS Code terminal:

```shell
node ➜ /workspace (main ✗) $ make start
```

Then open your browser to http://localhost:3000 and http://localhost:9411 to see traces.
