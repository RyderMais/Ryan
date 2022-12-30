const fs = require('fs');

async function initInteractionButton(client, interaction) {
    if (interaction.isButton()) {
        const buttons = fs.readdirSync('../../../src/events/interactions/buttons').filter(file => file.endsWith('.js'));

        (buttons.length <= 0) ? console.log(`[!] No buttons found!`) : console.log(`[!] ${buttons.length} buttons found!`);

        buttons.forEach((file) => {
            const button = require(`./buttons/${file}`).catch((err) => console.log(err));
            if (button.config.customId === interaction.customId) {
                button.run(client, interaction)
                console.log(`[!] Button "${interaction.customId}" was executed!`);
            }

            if (buttons.config) return console.log(`[!] Button "${interaction.customId}" wasn't configured correctly!`);
        });
    }
}

async function initCommands(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    const args = interaction.options;
    if (!command) return;

    try {
        await command.run(client, interaction);
    } catch (error) {
        console.error(error);
        // delete after 10 seconds
        await interaction.reply({ content: `Oops... There\'s an error while executing this command!\n> ${error}`, ephemeral: true });
    }
}

module.exports = async (client, interaction) => {
    await initInteractionButton(client, interaction);
    await initCommands(client, interaction);
}