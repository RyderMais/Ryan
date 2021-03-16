const Discord = require("discord.js");
const LowDB = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = LowDB(adapter);

module.exports = (client, message) => {

  if (message.author.bot) return;
  if (message.content.indexOf(client.config.presets.prefix) !== 0) return;

  const args = message.content.slice(1).trim().split(/ +/g);
  console.log(args+`: ${message.channel.guild.id}`);
  let command = args.shift(1).toLowerCase();
  let cmd = client.commands.get(command);
  if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }else{
    let embed = {
      "title": "Error Code: CMD_NOT_FOUND",
      "description": "Geralmente isso acontece quando o usuário tenta usar um comando que não existe, ou se houver algo de errado em meu código, que me impeça de ver/ler o código. \r\r**Possíveis Soluções**\r> - Verifique se escreveu corretamente;\r> - Checar se o comando existe;\r> - Comunique possível erro a `Bryceed#8168`",
      "url": "http://mizuki.rydermais.com/commands?return_error=CMD_NOT_FOUND",
      "color": 11338242,
      "footer": {
        "icon_url": "",
        "text": "Mizuki Bot (v"+`${client.globalPresets.version}`+") by RyderMais | http://mizuki.rydermais.com/"
      },
      "author": {
        "name": "Falha de execução",
        "url": "",
        "icon_url": "https://cdn.discordapp.com/emojis/640286785896710144.png?v=1"
      }
    };
    return message.reply("err... tem certeza?", { embed });
  }

  if (!cmd) return;

  console.log("OK");
  client.globalPresets.statusTimeout = 4;
  cmd.run(client, message, args);
  
};