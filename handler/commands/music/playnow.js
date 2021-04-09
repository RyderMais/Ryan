const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api")
const { OpusEncoder } = require('@discordjs/opus');
const Fs = require("fs")
var uuid = require('uuid');
require('dotenv').config()
let yt = new YouTube(process.env.API_GOOGLE_YOUTUBE);

exports.conf = {
    aliases: ['playnow', 'pn', 'playn', 'forceplay', 'fp']
};
exports.help = {
    name: "[PREMIUM] Play Music Now", 
    description: "Forces audio to play imediatelly\nUsage format: \`+play (url) [announce:Y/n]\`", 
    usage: "playnow"
};
exports.run = async (client, message, args) => {
    const server = message.guild.id;
    const voiceChannel = message.member.voice.channel;    
    const queue = new Map();
    const COLORS = {
      error: 0xe74c3c,
      info: 0x2ecc71,
      blue: 0x3498db,
      orange: 0xe67e22,
      white: 0xecf0f1,
      yellow: 0xf1c40f,
      dark: 0x2c3e50
    }
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
    const URL = args[0];
    let song = {url: URL}
    try{
        song.id=ytdl.getURLVideoID(song.url)
    }catch(e){
        return message.channel.send(":tv: **Você precisa informar um link válido**\n> No momento, apenas consigo tocar apenas o áudio de **vídeos no YouTube**.\n\n*_Caso isso seja um falso positivo, por favor, abra um report de bug no nosso repositório do GitHub:_ https://github.com/Bryceed/Ryan/issues")
    }
    const dispatcher = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      volume: 5,
    };

    try {
      var connection = await voiceChannel.join();
      try{
        yt.getVideo(song.url).then(video => {
            song.title=video.title || "404: Not Found (ಥ__ಥ)"
            dispatcher.connection = connection.play(ytdl(URL, {
                filter: 'audioonly',
                quality: 'lowestaudio',
                dlChunkSize: 0,
                highWaterMark: 1<<25
              }), {
                bitrate: 96000,
                volume: (55 / 100),
                highWaterMark: 1
              })
            .on('debug', (d) => {
                console.log(d);
            })
            .on('progress', (video, total, length) => {
                console.log('progress', total / length);
            })
            .on("finish", () => {
                voiceChannel.leave();
            })
            return message.channel.send("> :musical_note: Tocando \"**"+song.title+"**\" de YouTube");
        }).catch(console.error);
      } catch(e) {
        console.log(e);
      }
    } catch (err) {
      console.log(err);
      return message.channel.send(err);
    }

    async function play(connection, media) {
        try{connection
        .play(media)
        //.on("finish", () => {
            //connection.play(connection, URL)
            //.pipe(Fs.createWriteStream(__dirname+"/../../../data/stream-"+song.id+".mp3"))
            //voiceChannel.leave();
        //})
        .on("error", error => console.error(error), voiceChannel.leave())
        //.pipe(Fs.createWriteStream(__dirname+"/../../../data/stream-"+song.id+".mp4"))
        }catch(e){
            console.log(e)
        }
    }
    getYoutubeID = function (value) {
        var regEx = "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)"
        var matches = value.match(regEx)
        if (matches) {return matches[1]}
        return false
    }
}