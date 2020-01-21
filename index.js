const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NjY5MDQyNjQ3MzM5NDk5NTg1.XiaJLQ.4fukQE_fkMdjNdBtR3V5P3eX0mY";

var version = "1.0.1";

// For commands
const PREFIX = "!"

bot.on("ready", () => {
    console.log("Queue bot is online");
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
        default:
            message.channel.sendMessage("Command not understood");
    }
});

bot.login(token);