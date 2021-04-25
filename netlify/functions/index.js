const { App, ExpressReceiver } = require("@slack/bolt");
const dotenv = require("dotenv");
const {
    parseRequestBody,
    generateReceiverEvent,
    isUrlVerificationRequest
} = require("../utils");

dotenv.config();

const expressReceiver = new ExpressReceiver({
    signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
    processBeforeResponse: true
});

const app = new App({
    signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
    token: `${process.env.SLACK_BOT_TOKEN}`,
    receiver: expressReceiver
});

app.message(async ({ say }) => {
    await say("Hello, world!");
});

exports.handler = async (event, context) => {
    const payload = parseRequestBody(event.body, event.headers["content-type"]);

    if (isUrlVerificationRequest(payload)) {
        return {
            statusCode: 200,
            body: payload?.challenge
        };
    }

    const slackEvent = generateReceiverEvent(payload);
    await app.processEvent(slackEvent);

    return {
        statusCode: 200,
        body: ""
    };
};