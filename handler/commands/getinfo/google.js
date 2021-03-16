const Discord = require(`discord.js`);
const {google} = require('googleapis');
const fetch = require('superagent');
let api = "https://www.googleapis.com/customsearch/v1?key=";

exports.conf = {
    aliases: ['google', 'googlesearch', 'search', 'pesquisa', 'pesquisar', 'gs']
};
exports.help = {
    name: "Google Search", description: "Easy way to search for a result without open the browser", usage: "gs"
};
exports.run = async (client, message, args) => {
    let search = args.join(' ');console.log(search);

    api = api + client.config.googleapi + '&cx=https://cse.google.com/cse.js?cx=004596986766643398327:sx4l5vsxzuw&q=';
    // convert args to string and make one large sentance to search
    args = String(args).replace(',',' ');
    let msg = await message.channel.send("Pesquisando, aguente firme...");
    let newapi = api + search; 
    let { body } = await fetch.get(newapi);
    //console.log(body.items[1]);
    

    if(!{ body} ) return msg.edit("Oops! Algo não está funcionando como deveria (código de erro #8)");
    if(body.searchInformation.totalResults == 0) {
        msg.delete();
        return msg.edit('Oops! Algo não está funcionando como deveria (código de erro #8)');
    } 
    if(body.items[1]['title'] <= 0) body.items[1]['title'] = ['no title'];
    let cEmbed = new Discord.RichEmbed()
        .setColor(color.green)
        .addField('**', body.items[1]['title'])
        .addField('**Link **', body.items[1]['link'])
        .addField('**Description: **', body.items[1]['snippet'])
        .setTimestamp()
    
    message.channel.send({embed: cEmbed});



}


// Copyright 2012 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.