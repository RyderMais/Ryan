const Discord = require("discord.js");

exports.conf = {
    aliases: ['about', 'sobre']
};
exports.help = {
    name: "About", description: "Latency test", usage: "about"
};
exports.run = async (client, message, args) =>  {
    const embed = new Discord.RichEmbed()
    .setThumbnail(client.user.displayAvatarURL)
    .addField("**Introdução**", `Olá! Eu sou a Mizuki, sou uma robô configurada para ajudar os membros e administradores (de servidores Discord) a terem uma experiência mais confortável por aqui.`, false)
    .addField("**Funções**", `Em breve uma lista aqui`, false)
    .addField("**Idioma(s)**", `>>> :flag_br: Português (Brasil) \`atual\``, false)
    .addField("**Créditos**", `**Desenvolvido com ❤ (e muito ☕) pela equipe da RyderMais**\r<:github:312914172788736000> Repositório público da Mizuki em versão PTB e Release`, false)
    .setFooter(`v${client.globalPresets.version}`)
    .setColor(0x3D85C6)
    .setTimestamp()
    message.reply({embed});
}