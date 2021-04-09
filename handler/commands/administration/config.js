const Discord = require("discord.js");
const { OpusEncoder } = require('@discordjs/opus');
const Enmap = require(enmap);

exports.conf = {
    aliases: ['cefg', 'config', 'configuration', 'configuração']
};
exports.help = {
    name: "[PREMIUM] Pause Music", description: "Pause a current music", usage: "cfg"
};
exports.run = async (client, message, args) =>  {
    const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.adminRole);
    if(!adminRole) {
        message.reply("Administrator Role Not Found");
        setTimeout(() => message.delete(), 10000); 
        return false
    }
    if(!message.member.roles.cache.has(adminRole.id)) {
      return message.reply("You're not an admin, sorry!");
    }
    const [prop, ...value] = args;
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }
    let configProps = Object.keys(guildConf).map(prop => {
        return `${prop}  :  ${guildConf[prop]}`;
      });
      message.channel.send(`The following are the server's current configuration:
      \`\`\`${configProps.join("\n")}\`\`\``);
}