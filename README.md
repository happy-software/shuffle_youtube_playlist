# Shuffle Youtube Playlist

## Setup

1. install nodejs and yarn.

2. Run `yarn` to install required packages.

## Running a development server
`yarn start`

If you're running the backend locally as well, then make sure you update `AppConstants` to point
to your local server.

## Run tests locally

`yarn test`

## Deployment

Deployment is done via [gh-pages](https://github.com/tschaub/gh-pages). This publishes files to a `gh-pages` branch on GitHub. 

This is done by the [deploy.yml](.github/workflows/deploy.yml) GitHub Action, which runs automatically on merges to the main branch, or can be manually called in GitHub UI on any branch.

The latest commit SHA of the branch that is deployed will be recorded in a `meta` tag with name `ui-version` in the index.html of the deployed website.