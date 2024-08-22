- [Local Development](#local-development)
  - [Setup](#setup)
  - [Run App](#run-app)
  - [Run Tests](#run-tests)
- [Deployment](#deployment)
- [Error Tracking](#error-tracking)
- [Helpful Links](#helpful-links)
- [Repeat Video](#repeat-video)

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

# Error Tracking

Honeybadger is used to track errors from the front-end [SYT Front End](https://app.honeybadger.io/projects/126525/faults).

The API key is added in [deploy.yml](.github/workflows/deploy.yml), so running deploy from local will need to set this `.env` variable to enable error tracking on that deployment.

# Helpful Links

- [React Player](https://github.com/cookpete/react-player), used to interface with Youtube
- [Youtube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference), used to control some features of the Youtube player

# Repeat Video

- Record current video name or index
- When `repeat video` is enabled, listen to onProgress event.
- If current played seconds/percentage goes below previous, check that its the same video index. 
- If it isn't change to the correct video index.
- If `repeat video` is enabled, `next video` button clicks do not change song, seekTo 0 instead.
- Do not `setCurrentVideo` in `player.js` if `repeat video` is enabled