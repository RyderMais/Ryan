const Discord = require("discord.js");
const Josh = require("@joshdb/core");
const provider = require('@joshdb/sqlite');
const Enmap =  require('enmap');
const Moment = require("moment");
let db = new Josh({
    name: "discord-bot",
    provider: provider,
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        return;
    }
    
    console.log(`[` + Moment().format('DD/MM HH:mm:ss') + `]: [${message.guild.name}] ${message.author.tag} (${message.author.id}) said: "${message.content}"`);

    (async () => {
        message.prefix = await db.get("guilds."+message.guild.id+".prefix").then(prefix => {
            if (prefix == null) {
                db.set("guilds."+message.guild.id, {
                    prefix: client.presets.prefix
                });
                message.channel.send(":**Prefix: \`"+client.presets.prefix+"\`**");
                return console.log(`[` + Moment().format('DD/MM HH:mm:ss') + `]: [${message.guild.name}] Prefix: ${client.presets.prefix}`);
            }else{
                message.prefix = prefix;
                console.log(message.prefix);
                // if the user mentioned the bot, the bot will reply
                if (message.mentions.users.has(client.user.id)) {
                    return message.channel.send("Prefix: "+prefix);
                }else if (message.content.startsWith(message.prefix)) {
                    let messageArray = message.content.split(" ");
                    let input = messageArray[0];
                    let args = messageArray.slice(1);
                    let command = client.commands.get(input.slice(prefix.length));
    
                    if (command) {
                        command.run(client, message, args)
                    } else {
                        message.channel.send("Comando não encontrado.");
                    }
                }
            }
        })
    })();
}