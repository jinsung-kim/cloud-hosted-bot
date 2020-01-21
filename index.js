const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const bot = new Discord.Client();

var version = "1.0.1";

var servers = {};

// For commands
const PREFIX = "!"

bot.on("ready", () => {
    console.log("Music queue bot is online and running; Version: " + version);
});

bot.on("message", message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    // Takes command:
    switch(args[0]) {
        // Gets the version number
        case "info":
            if (args[1].toLowerCase() === "version") message.channel.sendMessage("Version: " + version);
            else message.channel.sendMessage("Argument not valid");
            break;
        // Clears number of messages specified
        case "clear":
            if (!args[1]) return message.reply("Argument not understood");
            message.channel.bulkDelete(args[1]);
            break;
        case "play":
            // For the Connection Function
            function play(connection, message) {
                var server = servers[message.guild.id];
                // Download link to YT video, and plays it
                // Filter out the video to save bandwidth
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();
                server.dispatcher.on("end", function() {
                    // If there is another song to play in the queue
                    if (server.queue[0]) {
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                })

            } 
            if (!args[1]) return message.reply("You need to follow up with a link");
            if (!message.member.voiceChannel) return message.reply("You need to be in a valid channel");
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id];
            // Add song to the queue
            server.queue.push(args[1]);
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "help":
            message.channel.send("Commands:");
            message.channel.send("!play [Youtube Link]: Queue a song");
    }
});

bot.login(process.env.BOT_TOKEN);