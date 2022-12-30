const { readdirSync } = require('fs');

module.exports = (client) => {
    const slashCommands = [];

    const load = async dirs => {
        const commands = readdirSync(`./src/commands/${dirs}`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.name, pull);
            slashCommands.push(pull);

            console.log(`Loaded command ${pull.name}.`);
        }
    };

    client.on('ready', async () => {
        await client.application.commands.set(slashCommands);
    });

    readdirSync('./src/commands/').forEach((dir) => load(dir));
};