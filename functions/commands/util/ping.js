exports.help = {

    authors: ['Bryceed'],
    version: '2.0.0',

    name: 'ping',
    description: 'Pings the bot.',
    usage: 'ping',
    category: 'Utility',
    aliases: ['ping','pong', 'pingpong','latency'],
    permissions: [],
    args: false
}

exports.run = async (client, message, args) => {
    // await then edit
    message.channel.send('Pong!').then(msg => {
        msg.edit(`Pong! Latency: ${Math.round(client.ws.ping)}ms`);
    }
    )
    setTimeout(() => {
        message.delete();
    }, 5000);
}
