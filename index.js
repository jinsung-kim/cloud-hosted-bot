const Discord = require("discord.js");
const bot = new Discord.Client();

// Token changed
const token = "NjY5MDQyNjQ3MzM5NDk5NTg1.Xiav9g.nLMJTThge2h5GSP-bCdGtF92kUA";

var version = "1.0.1";

// For commands
const PREFIX = "!"

bot.on("ready", () => {
    console.log("Music queue bot is online and running");
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
            if (!args[1]) return message.reply("Args not understood");
            message.channel.bulkDelete(args[1]);
            break;
        // case:
        //     message.channel.sendMessage("That nigga retarded");
        //     break;
    }
});

bot.login(token);