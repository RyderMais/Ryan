exports.run = async () => {
    const Discord = require('discord.js');
    const Fs = require('fs');
    const Path = require('path');
    const Client = new Discord.Client({
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
    });
    const Events = Fs.readdirSync(
        Path.join(__dirname, 'events')
    );

    // For each event
    for (const file of Events) {
        // Event should be a js file
        if (!file.endsWith('.js')) continue;
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        
        // "Ready" event only runs once
        switch(eventName) {
            case 'ready':
                Client.once('ready', event.run);
                break;
            default:
                Client.on(eventName, event.run);
        }
    }

    require('dotenv').config()
    Client.login(process.env.TOKEN);
}