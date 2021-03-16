const Discord = require("discord.js");
const ytdl = require("ytdl-core-discord");
const YouTube = require("simple-youtube-api")
const yt = new YouTube("AIzaSyAzQCr1C6B70kNWvoZseRFYs35JUQpHEkI");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data/musicQueue.json')
const db = low(adapter)
db.defaults({}).write()

exports.conf = {
    aliases: ['playnow', 'pn', 'playn', 'forceplay', 'fp']
};
exports.help = {
    name: "[PREMIUM] Play Music Now", description: "Force to current music starts to play imediatelly", usage: "playnow"
};
exports.run = async (client, message, args) =>  {

    const server = message.guild.id;

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

    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      volume: 5,
    };

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(connection, URL); 
      return message.channel.send("> :musical_note: Tocando \"**"+song["title"]+"**\" em YouTube");
    } catch (err) {
      console.log(err);
      return message.channel.send(err);
    }


  async function play(connection, url) {
      connection.playOpusStream(await ytdl(url, { filter: 'audioonly' }));
  }
}