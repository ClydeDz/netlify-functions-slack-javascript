# Netlify Functions x Slack Bolt JS
Template repository to run a Slack app using Bolt JS framework on a Netlify Function. Fork this repository, follow the steps below and get your Slack app running within minutes.

## Getting started
1. Install all node dependencies using `npm install`.
1. Install the Netlify Dev CLI tool using `npm install netlify-cli -g`.
1. Create an `.env` file and paste the following contents, replacing the secret and bot token with your values from Slack.
```
SLACK_SIGNING_SECRET="PASTE CONTENTS HERE"
SLACK_BOT_TOKEN="PASTE CONTENTS HERE"
```
1. Link Netlify site wit this code folder by running the command `npm run link`.
1. Build the project using `npm run build`. This will also run the unit tests.
1. Finally, execute the command `npm run go` to start a local instance of the Netlify Function.

## What is the expected output? 
Assuming you've got your Slack app covered, when you a post a message in the channel, the app should send a message in the same channel with a "Hello, world" message.

---
Follow Clyde D'Souza on [Twitter](https://twitter.com/clydedz) and [Medium](https://clydedz.medium.com/)