/*------------------------------+
|  0.    Global Declarations    |
+------------------------------*/
const Discord = require("discord.js")
const Moment = require("moment")
const Enmap = require("enmap")
const Josh = require("@joshdb/core")
const provider = require('@joshdb/sqlite')
const Fs = require("fs")
const Path = require("path")
require('dotenv').config()

const package = require("./package.json")
var presets = require("./presets.json")
const client = new Discord.Client(
  { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }
)

client.config = new Josh({
  name: "discord-bot",
  provider: provider,
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
    prefix: "+",
    modLogChannel: 0,
    modRole: 0,
    adminRole: 0,
    lang: "pt-BR",
    welcomeChannel: 0,
    welcomeMessage: 0
  }
});
client.presets = presets
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const modules = client.presets.modules

process.on('unhandledRejection', error => {
  console.error('Erro inesperado:', error);
});

Fs.readdir(__dirname+`/handler/events/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(__dirname+`/handler/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

modules.forEach(c => {
  Fs.readdir(__dirname+`/handler/commands/${c}/`, (err, files) => {
  if (err) return console.error(err);
  console.log(`[Modules Handler]: ${files.length} "${c}" `);
    files.forEach(async f => {
      const props = require(__dirname+`/handler/commands/${c}/${f}`);
      client.commands.set(props.help.usage, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.usage)
      });
    });
  });
});

/*------------------------------+
|  2.       Bot Starting        |
+------------------------------*/
client.on('raw', packet => {
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
  const channel = client.channels.get(packet.d.channel_id);
  if (channel.messages.has(packet.d.message_id)) return;
  channel.fetchMessage(packet.d.message_id).then(message => {
      const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
      const reaction = message.reactions.get(emoji);
      if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
      if (packet.t === 'MESSAGE_REACTION_ADD') {
          client.emit('messageReactionAdd', message, reaction, client.users.get(packet.d.user_id)), client.users.get(packet.d);
      }
      if (packet.t === 'MESSAGE_REACTION_REMOVE') {
          client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
      }
  }); /*https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/raw-events.md*/
});

/*------------------------------+
|  3.         Actions           |
+------------------------------*/
client.on('messageReactionAdd', (reaction, user) => {
  client.presets.statusTimeout = 3;
  console.log('a reaction has been added');
});

client.on('messageReactionRemove', (reaction, user) => {
  client.presets.statusTimeout = 3;
  console.log('a reaction has been removed');
});



/*------------------------------+
|  4.    Back-end Functions     |
+------------------------------*/

if(typeof process.env.API_DISCORD_STABLE !== typeof undefined){
  try{
    client.login(process.env.API_DISCORD_STABLE);
  }catch(err){
    console.log(`An error was ocurred while I tried to login: ${err}`);
  }
  client.presets.local = 0;
}else if(typeof process.env.API_DISCORD_BETA !== typeof undefined){
  try{
    client.login(process.env.API_DISCORD_BETA);
  }catch(err){
    console.log(`An error was ocurred while I tried to login: ${err}`);
  }
  client.presets.local = 0;
}else if(typeof process.env.API_DISCORD_DEV !== typeof undefined){
  try{
    client.login(process.env.API_DISCORD_DEV);
  }catch(err){
    console.log(`An error was ocurred while I tried to login: ${err}`);
  }
  client.presets.local = 1;
}else{
  console.log("[!] You need to set the OAuth Key of your Discord Bot. Vars accepted, ordered by priority: process.env.DISCORDAUTH / vars.auth_discord / vars.auth_test");
  console.log("[LOGIN] None of these login methods worked (yet).");
  console.log("If you have sure that your Discord OAuth Key was right and set, maybe:");
  console.log("1) It's a temporary error (like an instability in Discord API). Check detais in https://status.discordapp.com");
  console.log("2) Your OAuth Key is wrong or was changed. Did you regenerated it?");
  console.log("3) Your original project was deleted, maybe you're tring to login in a new project using an old key.");
}
