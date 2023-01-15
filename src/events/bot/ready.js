const { ActivityType } = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');
const request = require('request');

const stats = JSON.parse(fs.readFileSync('./src/public/stats.json', 'utf8'));

module.exports = async (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({
        //show the online time as timestamp start
        startTimestamp: new Date(),
        activities: [{
            name: `${client.guilds.cache.size} servers`,
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/Bryceed'
        }],
        status: 'idle', // online, dnd, idle, 
    });

    cron.schedule('*/10 * * * * *', () => {
        stats.runNumber = stats.runNumber + 1 || 1;
        stats.totalServers = client.guilds.cache.size;
        stats.latency = client.ws.ping;
        stats.uptime = Math.floor(client.uptime / 1000);
        stats.lastUpdate = new Date();
        fs.writeFileSync('./src/public/stats.json', JSON.stringify(stats, null, 2), 'utf8');

        //send imediately a post request to external server
        request.post({
            url: 'http://localhost:8081/api/recieveStats.php',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true, 
            body: JSON.stringify(stats)
        }, (err, res, body) => {
            if (err) {
                return console.log(err);
            } else {
                res.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
                res.on('error', (error) => {
                    console.error(error);
                });
            }
        });
        

        console.log('Stats updated!');
    });
}