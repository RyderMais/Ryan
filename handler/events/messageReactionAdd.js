const Discord = require("discord.js");
const LowDB = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/reactions.json');
const db = LowDB(adapter);

module.exports = async (msg, reaction, user, details) => { 
  console.log("messageReactionAdd");
  if(!user) return;
  if(user.bot)return;
  const { message, emoji } = reaction;
  var gameRolesList = {
    "Audition": "700106525255139380",
    "Baixo Cidade": "707314104762630166",
    "Call Of Duty": "724386405492588604",
    "Club Cooee": "700105957488721922",
    "Cyber Hunter": "700105274576470026",
    "Dance Central": "700105717260091392",
    "Dead By Daylight": "700105758993416194",
    "Fortnite": "724386453433614336",
    "Free Fire": "700105509365088308",
    "Just Dance": "700105644858146928",
    "Knives Out": "724386841964445737",
    "League of Legends": "700105846079619132",
    "Love Ritmo, LoveBeat": "619049513247703040",
    "Minecraft": "724171790951383081",
    "osu!": "700106061906051113",
    "Overwatch": "700105908394524767",
    "The Sims": "724385452441993328",
    "PUBG": "724385881217171467"
  };
  console.log(`"${reaction.message.channel}" gained a reaction!`);
  if(reaction.message.channel == "<#"+"664825677408894996>") {
    if (reaction.emoji.name+reaction.emoji.id === "direita616321851228160021") {
      if (reaction.message.content.has(`${gameRolesList[1]}`)) {
        const guildMember = reaction.message.guild.members.get(user.id);
        const role = reaction.message.guild.roles.find(`${gameRolesList[2]}`);
        guildMember.addRole(role);
        console.log("Cargo aplicado");
      }
    }else{console.log("Reação inválida");}
  }else{console.log("Canal inválido");}

}