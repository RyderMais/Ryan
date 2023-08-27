const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({ //total of servers
        activities: [{
            name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching
        }],
        status: 'away',
    });
}