require('dotenv').config();

const fs = require('fs');
const { EmbedBuilder, ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
    name: 'help',
    description: 'Get the help of the selected user, or your own help.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'command',
            description: 'The command you want to get the details.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {

        let commands = client.commands;
        let fields = [];

        commands.forEach((command) => {
            fields.push({
                name: `\`/${command.name}\``,
                value: command.description,
                inline: true,
            });
        });

        let embed = new EmbedBuilder()
            .setDescription('That\'s my list of commands!')
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter({ text: 'Made with ☕ by @Bryceed#8168' })
            .addFields(fields);
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('primary')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Primary),
        );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};
