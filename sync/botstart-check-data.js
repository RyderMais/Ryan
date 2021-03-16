const Discord = require("discord.js");
const LowDB = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/servers.json');
const db = LowDB(adapter);
const client = new Discord.Client();

let guildList = client.guilds.array();
  
try{
  guildList.forEach(guild => {
    if(!db.get(`guilds`).findKey(guild.id).value()) {
      db.get(`guilds`).push({
        [guild.id]: [{
          "dj": 1,
          "dj_24h": 1,
          "lapi": 1,
          "lapi_schedule_minutes": 2 
        }]
      }).write()
    }
  });
  console.log("[!] LOWDB SYNCED ALL DATA");
}catch (err) {
  console.log(err);
}