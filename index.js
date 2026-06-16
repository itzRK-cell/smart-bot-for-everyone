require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/smart-bot-for-everyone-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
app.command("/smart-bot-for-everyone-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
app.command("/smart-bot-for-everyone-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/smart-bot-for-everyone-ping - Check bot latency
/smart-bot-for-everyone-catfact - Get a cat fact`
  });
});
(async () => {
  await app.start();
  console.log("bot is running!");
})();