const Discord = require("discord.js");
const Moment = require('moment');

exports.conf = {
    aliases: ['time', 'tiempo', 'hora', 'tempo', 'hora', 'hour', 'minutos', 'dia', 'day', 'week', 'semana', 'ano', 'year']
  };
  exports.help = {
    name: "Time", description: "Check date and time easily", usage: "time"
  };
  exports.run = async (client, message, args) =>  {
    switch(args.shift(0)){
      case "time":
        embed = new Discord.RichEmbed()
          .setDescription("Now is\r"+Moment().format('LLLL:ss'))
          .addField("**Timezone**", `*(server unknown)*`, true)
          .addField("**Layout**", `en-US`, true)
          .addField("**Idioma(s)**", `>>> :flag_br: Português (Brasil) \`atual\``, false)
          .addField("**Créditos**", `**Desenvolvido com ❤ (e muito ☕) pela equipe da RyderMais**\rRepositório público da Mizuki em versão PTB e Release`, false)
          .setFooter(`Build version: ${client.globalPresets.version}`)
          .setColor(0x3D85C6)
          .setAuthor("Info > Time")
          .setTimestamp()
          message.send({embed});
        break;
    }
  }