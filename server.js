const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`[LOG] Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("YouTube-Bot-Discord");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`[LOG] [PORT] ` + listener.address().port);
});


const discord = require("discord.js")
const client = new discord.Client()
const { TOKEN, CHANNEL_ID, SERVER_CHANNEL_ID } = require("./config.json"); //Config 
const YouTubeNotifier = require('youtube-notification');

const notifier = new YouTubeNotifier({
  hubCallback: 'https://localhost:3000/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});


notifier.on('notified', data => {
  console.log('[YouTube] New Video');
  client.channels.cache.get(SERVER_CHANNEL_ID).send(
    `**${data.channel.name}** just uploaded a new video - **${data.video.link}**` //Here you can personalize your message
  );
});
 
notifier.subscribe(CHANNEL_ID);

app.use("/yt", notifier.listener());


client.login(TOKEN)
