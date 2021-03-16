/*------------------------------+
|  0.    Global Declarations    |
+------------------------------*/
const Discord = require("discord.js");
const Moment = require("moment")
const package = require("./package.json");
const fs = require("fs");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const Enmap = require("enmap");
const config = require("./config.json");
var presets = require("./presets.json");

client.config = config;
client.config.presets = presets;
client.globalPresets = globalPresets;

const modules = presets.modules;

fs.readdir("./handler/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./handler/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
modules.forEach(c => {
  fs.readdir(`./handler/commands/${c}/`, (err, files) => {
  if (err) return console.error(err);
  console.log(`[Modules Handler]: ${files.length} "${c}" `);
    files.forEach(f => {
      const props = require(`./handler/commands/${c}/${f}`);
      client.commands.set(props.help.usage, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.usage);
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

client.on("ready", async () => {
  Moment.locale('pt-br');
  console.log(`\n[` + Moment().format('YYYYMMDD HHmmss') + `]: [+] BOT STARTED AS "${client.user.username}"`);
  console.log(`[` + Moment().format('YYYYMMDD HHmmss') + `]: [+] USERS: ${client.users.size} | CHANNELS: ${client.channels.size} | GUILDS: ${client.guilds.size}`);

  client.globalPresets.statusTimeout = 2;
    const phases = [
    'bryceed.github.io/ryan',
    'ryan.RyderMais.com',
    ''+client.users.size+' users',
    ''+client.channels.size+' channels',
    ''+client.guilds.size+' servers (●\'◡\'●)'
  ];
  // online, busy, idle, invisible
  globalPresets.statusTimeout = 2;
  globalPresets.statusLast = "offline";
  globalPresets.firstExec = 1;
  setInterval(function() {
    if(globalPresets.statusTimeout >= 2) {
      if(globalPresets.firstExec == 1 || globalPresets.statusTimeout == 3) {
        client.user.setStatus('bnb');
        globalPresets.statusLast = "bnb";
      }
      else if(globalPresets.statusLast != "online" || globalPresets.firstExec != 1) {
        client.user.setStatus('online').then().catch();
        globalPresets.statusLast = "online";
        console.log(`[` + Moment().format('YYYYMMDD HHmmss') + `]: --status:online`);
      }
      globalPresets.statusTimeout--;
    }else if(globalPresets.statusTimeout >= 1) {
      client.user.setStatus('idle');
      if( globalPresets.firstExec == 1) {client.user.setStatus('idle');}
      globalPresets.statusLast = "idle";
      globalPresets.firstExec = 0;
      console.log(`[` + Moment().format('YYYYMMDD HHmmss') + `]: --status:idle`);
      globalPresets.statusTimeout--;
    }
  }, 15000);

  if(client.globalPresets.local != 1 || client.globalPresets.local != undefined){ 
    client.user.setPresence({
      game: {
        name: 'Carregando...',
        type: "WATCHING", // Streaming, watching
        //url: "https://www.twitch.tv/monstercat"
      }
    });
  }
  setInterval(function(){
    client.user.setPresence({
      game: {
        name: `${phases[Math.floor(Math.random() * phases.length)]}`,
        type: "WATCHING",
      }
    });
  }, 30000);

});

/*------------------------------+
|  3.         Actions           |
+------------------------------*/
client.on('messageReactionAdd', (reaction, user) => {
  client.globalPresets.statusTimeout = 3;
  console.log('a reaction has been added');
});

client.on('messageReactionRemove', (reaction, user) => {
  client.globalPresets.statusTimeout = 3;
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
  client.globalPresets.local = 0;
}else if(typeof process.env.API_DISCORD_BETA !== typeof undefined){
  try{
    client.login(process.env.API_DISCORD_BETA);
  }catch(err){
    console.log(`An error was ocurred while I tried to login: ${err}`);
  }
  client.globalPresets.local = 0;
}else if(typeof process.env.API_DISCORD_DEV !== typeof undefined){
  try{
    client.login(process.env.API_DISCORD_DEV);
  }catch(err){
    console.log(`An error was ocurred while I tried to login: ${err}`);
  }
  client.globalPresets.local = 1;
}else{
  console.log("[!] You need to set the OAuth Key of your Discord Bot. Vars accepted, ordered by priority: process.env.DISCORDAUTH / vars.auth_discord / vars.auth_test");
  console.log("[LOGIN] None of these login methods worked (yet).");
  console.log("If you have sure that your Discord OAuth Key was right and set, maybe:");
  console.log("1) It's a temporary error (like an instability in Discord API). Check detais in https://status.discordapp.com");
  console.log("2) Your OAuth Key is wrong or was changed. Did you regenerated it?");
  console.log("3) Your original project was deleted, maybe you're tring to login in a new project using an old key.");
}
