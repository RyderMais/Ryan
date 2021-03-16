const Discord = require("discord.js");

exports.conf = {
    aliases: ['profile', 'userprofile', 'perfil', 'perfilde']
};
exports.help = {
    name: "User Profile", description: "Latency test", usage: "profile"
};
exports.run = async (client, message, args) =>  {
    let user = 0;
    let nick = 0;

    //discordJS Guide
    function getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
        const id = matches[1];
        return client.users.fetch(id);
    } //end from discordJS Guide

    if(args[0] != null) {
        user = client.users.find(user => user.id, getUserFromMention(args[0]));
    }else{
        user = message.author;
    }
    console.log(user);
    if (user.bot == true) {
        nick = "[BOT] "+user.username;
    }else if(user.lastMessage.member.nickname == null) {
        nick = user.username;
    }else{
        nick = user.lastMessage.member.nickname;
    }
    let embed = new Discord.RichEmbed()
    .setAuthor("Perfil de \""+nick+"\" ("+user.username+"#"+user.discriminator+")")
    .setDescription("*Detalhes sobre o meu funcionamento*\r\r**Discord:**\rServidores: `"+client.guilds.size+"`\rCanais: `"+client.channels.size+"`\rUsuários: `"+client.users.size+"`")
    .setDescription(message.member.user.lastMessage)
    .setFooter("Sistema Local, NodeJS")
    .setThumbnail(user.displayAvatarURL)
    .setColor(0xffff33)
    .setTimestamp()
    message.channel.send(embed);
  }