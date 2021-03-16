const Discord = require("discord.js");
const LowDB = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/privaterooms.json');
const db = LowDB(adapter);


exports.conf = {
    aliases: ['room', 'sala', 'salas', 'privado', 'privada']
};
exports.help = {
    name: "Private Rooms", description: "...", usage: "rooms"
};
exports.run = async (client, message, args, db) =>  {
    console.log(args[1]);
    switch(args[0]) {
        case "create":
            console.log("OK 2");
            break;
        case "delete":
            break;
        case "rename":
            break;
        default:
            const embed = new Discord.RichEmbed()
            .setThumbnail("https://i.pinimg.com/564x/e3/99/ae/e399aef64d9207f5f9f4878b39b02df6.jpg")
            .addField("**Introdução**", `Querendo conversar com alguém, em particular, sem perder as vantagens de se estar em servidor (como os emojis personalizados)? Pensando nisso, criamos o comando de \`salas\`.\r\rAo criar`, false)
            .addField("**Funções**", `:small_orange_diamond: Criar sala privada\r:small_orange_diamond: Criar sala privada (temporária)\r`, false)
            .addField("**Idioma(s)**", `>>> :flag_br: Português (Brasil) \`atual\``, false)
            .addField("**Créditos**", `**Desenvolvido com ❤ (e muito ☕) pela equipe da RyderMais**\rRepositório público da Mizuki em versão PTB e Release`, false)
            .setFooter(`Build version: ${client.globalPresets.version}`)
            .setColor(0x3D85C6)
            .setAuthor("Salas Privadas (Private Rooms)")
            .setTimestamp()
            message.reply({embed});
            break;
    }
}