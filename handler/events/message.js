const Discord = require("discord.js");
const Josh = require("@joshdb/core");
const provider = require('@joshdb/sqlite');
const Enmap =  require('enmap');

const db = new Josh({
  name: 'testing',
  provider,
});

module.exports = (client, message) => {
  console.log(message.content)
  if (message.author.bot) return;
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if(message.content.match(prefixMention) != null) {
    console.log("Single mention")
    return message.reply(`my :speech_balloon: **Chat Prefix** here is: \`!\`\n\n> Você pode digitar \`!help\`, \`!ajuda\` para ver uma lista\n> *...or visit: https://ryan.rydermais.com/ for more info*`);
  }
  if (message.content.indexOf(client.presets.prefix) !== 0) return;

  const args = message.content.slice(1).trim().split(/ +/g);
  let command = args.shift(1).toLowerCase();

  console.log(args+`: ${message.channel.guild.id}`);
  cmd = client.commands.has(command) || client.aliases.has(command)
  let debugMode=0
  if (args.includes("--debug")) {debugMode=1}
  if (cmd != true) {
    let embed = {
      "title": "Error Code: CMD_NOT_FOUND",
      "description": "Geralmente isso acontece quando o usuário tenta usar um comando que não existe, ou se houver algo de errado em meu código, que me impeça de ver/ler o código. \r\r**Possíveis Soluções**\r> - Verifique se escreveu corretamente;\r> - Checar se o comando existe;\r> - Comunique possível erro a `Bryceed#8168`",
      "url": "http://mizuki.rydermais.com/commands?return_error=CMD_NOT_FOUND",
      "color": 11338242,
      "footer": {
        "icon_url": "",
        "text": "Mizuki Bot (v"+`${client.presets.version}`+") by RyderMais | http://mizuki.rydermais.com/"
      },
      "author": {
        "name": "Falha de execução",
        "url": "",
        "icon_url": "https://cdn.discordapp.com/emojis/640286785896710144.png?v=1"
      }
    }
    return message.reply('', { embed });
  }else{
    cmd = client.commands.get(command) || client.aliases.get(command)
  }
  console.log("OK");
  client.presets.statusTimeout = 4;
  try{
    cmd.run(client, message, args, debugMode)
  }catch(e) {
    console.log(e);
  }
};