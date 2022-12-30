require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Channel,
        Partials.User,
        Partials.Reaction,
    ],
});

['commands', 'aliases'].forEach((handler) => { client[handler] = new Collection(); });
['commands', 'events'].forEach((handler) => { require(`./handlers/${handler}`)(client); });


try {
    client.login(process.env.TOKEN);
} catch (error) {
    console.log(error);
}