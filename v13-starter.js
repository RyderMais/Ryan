// Dependencies
const { Client, Intents }                    =  require('discord.js');
const { REST }                               =  require('@discordjs/rest');
const { Routes }                             =  require('discord-api-types/v9');
 let  { version, clientID, guildID, token }  =  require('./config.json');


// Validating
if (!token || token == 0) {
    try {
        token = process.env.DISCORD_TOKEN;
    } catch (error) {
        console.log(`[FATAL ERROR] ${error}`);
        process.exit(1);
    }
}

// Instances
const client = new Client(
{
	makeCache: Options.cacheWithLimits(
    {
		MessageManager: 200,
		PresenceManager: 0
	}),
    shardCount: 1,
    messageCacheMaxSize: 200,
    messageCacheLifetime: 3600,
    messageSweepInterval: 3600,
    disabledEvents: [
        'TYPING_START',
        'VOICE_STATE_UPDATE',
        'VOICE_SERVER_UPDATE',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'USER_GUILD_SETTINGS_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        'GUILD_EMOJIS_UPDATE',
        'GUILD_INTEGRATIONS_UPDATE'
    ]
});
const rest = new REST(
{ 
    version: '9' 
}
).setToken(token);


// Command Handler
const commands = [
	new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
	new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
	new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
]
.map(command => command.toJSON());

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


// Events
 /*
 /   Function: onReady (once)
 /   Description: Called when the bot sucessfully joined through Discord API.
 /   Authors: @Bryceed
 /
 /   Parameters: null
 /   Returns: undefined
*/
client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});


// Initializers
client.login(process.env.DISCORD_TOKEN);