const Discord = require("discord.js");

exports.conf = {
    aliases: ['stats', 'status', 'estatísticas']
};
exports.help = {
    name: "Stats", description: "Latency test", usage: "stats"
};
exports.run = async (client, message, args) =>  {
    let embed = new Discord.RichEmbed()
        .setThumbnail(client.user.displayAvatarURL)
        .setAuthor("Estatísticas")
        .setDescription("*Detalhes sobre o meu funcionamento*\r\r**Discord:**\rServidores: `"+client.guilds.size+"`\rCanais: `"+client.channels.size+"`\rUsuários: `"+client.users.size+"`")
        .setFooter("Sistema Local, NodeJS")
        .setColor(0xffff33)
        .setTimestamp()
        message.channel.send(embed);
}