- [Local Development](#local-development)
  - [Setup](#setup)
  - [Run App](#run-app)
  - [Run Tests](#run-tests)
- [Deployment](#deployment)
- [Helpful Links](#helpful-links)

# Local Development

## Setup

1. install nodejs and yarn.

2. Run `yarn` to install required packages.

## Run App

Run `yarn start` in the terminal to start the app

If you're running the backend Happy Youtube Watcher locally as well, update `AppConstants` to point to your local server.

## Run Tests

Run `yarn test` to test the app.

# Deployment

Deployment is done via [gh-pages](https://github.com/tschaub/gh-pages). This publishes files to a `gh-pages` branch on GitHub. 

The [deploy.yml](.github/workflows/deploy.yml) GitHub Action runs automatically on merges to the main branch, or can be manually called on any branch via the GitHub website.

The latest commit SHA of the branch that is deployed will be recorded in a `meta` tag with name `ui-version` in the index.html of the app.

# Helpful Links

- [React Player](https://github.com/cookpete/react-player), used to interface with Youtube
- [Youtube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference), used to control some features of the Youtube player