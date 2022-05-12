const Discord = require("discord.js");
const Josh = require("@joshdb/core");
const provider = require('@joshdb/sqlite');
const Enmap =  require('enmap');
const Moment = require('moment');

let db = new Josh({
  name: "discord-bot",
  provider: provider,
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

Moment.locale('pt-br');

module.exports = async (client) => {
  
  console.log(client.commands);
  console.log(`\n[` + Moment().format('YYYYMMDD HHmmss') + `]: [+] BOT STARTED AS "${client.user.username}" (${client.user.id})`);

  console.log(`[` + Moment().format('YYYYMMDD HHmmss') + `]: [+] USERS: ${client.users.cache.size} | CHANNELS: ${client.channels.cache.size} | GUILDS: ${client.guilds.cache.size}`);

  client.presets.statusTimeout = 2;
    const phases = [
    'bryceed.github.io/ryan',
    'ryan.rydermais.com',
    ''+client.users.cache.size+' users',
    ''+client.channels.cache.size+' channels',
    ''+client.guilds.cache.size+' servers (●\'◡\'●)'
  ];

  let phase = 0;
  client.user.setActivity(phases[0], {});

  setInterval(() => {
    client.user.setActivity(phases[phase], { type: 'WATCHING' });
    phase = (phase + 1) % phases.length;
  }
  , client.presets.statusTimeout * 15000);

  // CHECK DATABASE
  
  client.guilds.cache.forEach(guild => {
    (async () => {
      await db.ensure("guilds."+guild.id, {
        prefix: "+",
        modLogChannel: 0,
        modRole: 0,
        adminRole: 0,
        lang: "pt-BR",
        welcomeChannel: 0,
        welcomeMessage: 0,
        isPremium: false
      });
    })();
  }); 

  (async () => {
    console.log(`Connected, there are ${await db.size} rows in the database.`);
    console.log(`[` + Moment().format('YYYYMMDD HHmmss') + `]: [+] DATABASE: guild 583072723639730177 has prefix: ${await db.get("guilds.583072723639730177.prefix")}`);
  })();
}