const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data/musicQueue.json')
const db = low(adapter)
db.defaults({}).write()

exports.conf = {
    aliases: ['play', 'tocar', 'reproduce', 'reproduzir', 'toque']
};
exports.help = {
    name: "[PREMIUM] Pause Music", description: "Pause a current music", usage: "pause"
};
exports.run = async (client, message, args) =>  {

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel)
      return message.reply(
        "Você precisa estar conectado em um canal de voz desse servidor."
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        ":x: **Preciso de permissão para pode conectar e falar.**\rInforme o problema para algum responsável pelo servidor, para que possam alterar minhas permissões."
      );
    }
 
    const URL = args[0]; console.log(URL);
    const songInfo = await ytdl.getInfo(URL, {downloadURL: true});
    const song = {
        "title": `${songInfo.title}`,
        "url": `${songInfo.video_url}`
    };

    const server = message.guild.id;

    if (!db.has([message.guild.id]).value()) {
        console.log("> data/musicQueue +"+server);
      const queueContruct = {
        "textChannel": `${message.channel}`,
        "voiceChannel": `${voiceChannel}`,
        "connection": null,
        "songs": [],
        "volume": 5,
        "playing": 1,
        "stayhere": 0
      };
      db.set([server], {}).write();
      db.get(server).assign(queueContruct).write();
      db.get(server).assign({"songs": [`${song}`]}).write();
  
      try {
        let connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(server, queueContruct.songs[0]);
        return message.channel.send("> :musical_note: Tocando \"**"+song["title"]+"**\" em YouTube") 
      } catch (err) {
        console.log(err);
        db.get(server).remove("songs").write();
        db.get(server).push({"playing": 0}).write();
        return message.channel.send(err);
      }
    } else {
      db.get(server).push({"songs": [{song}]}).write();
      return message.channel.send(`**${song["title"]}** foi adicionado à fila!`);
    }

    async function play(connection, song) {
      if (db.get(server).value() == message.guild.id) {
        if (db.get(server.stayhere).value() != 1) {
          server.voiceChannel.leave();
        }
        db.get(server).remove("songs[0]").write();
        return;
      }
    
      const dispatcher = server.connection
        .playOpusStream(await ytdl(URL, { filter: 'audioonly' }))
        .on("finish", () => {
          server.songs.shift();
          play(connection, db.get('[message.guild.id].songs[0]').value());
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(server.volume / 5);
      server.textChannel.send(`> :musical_note: Tocando "**${song["title"]}**" em YouTube.`);
    }

    // Partial Credits: https://gabrieltanner.org/blog/dicord-music-bot
}


/*

const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");

exports.conf = {
    aliases: ['play', 'tocar', 'reproduce', 'reproduzir', 'toque']
};
exports.help = {
    name: "[PREMIUM] Play Music", description: "Start to play a music at your voice channel in the server that you're are", usage: "play"
};
exports.run = async (client, message, args) =>  {
    const server = client.queue.get(message.guild.id);

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel)
      return message.reply(
        "Você precisa estar conectado em um canal de voz desse servidor."
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        ":x: **Preciso de permissão para pode conectar e falar.**\rInforme o problema para algum responsável pelo servidor, para que possam alterar minhas permissões."
      );
    }
 
    const URL = args[0]; console.log(URL);
    const songInfo = await ytdl.getInfo(URL);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };
  
    if (!server) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      client.queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(connection, queueContruct.songs[0]["url"]);
        return message.channel.send("> :musical_note: Tocando \"**"+song["title"]+"**\" em YouTube")
      } catch (err) {
        console.log(err);
        client.queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      server.songs.push(song);
      return message.channel.send(`**${song.title}** foi adicionado à fila!`);
    }

    async function play(connection, url) {
        connection.playOpusStream(await ytdl(url, { filter: 'audioonly' }));
    }

    // Partial Credits: https://gabrieltanner.org/blog/dicord-music-bot
}*/