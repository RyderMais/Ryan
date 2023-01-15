require('dotenv').config();

const fs = require('fs');
const { EmbedBuilder, ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
    name: 'settings',
    description: 'Change the configuration of the bot (based on your access level).',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'option',
            description: 'The command you want to get the details.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'value',
            description: 'The value you want to set.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!client.user) return;
        if (!interaction.guild) return;

        switch (interaction.options.getString('option')) {
            case 'nickname':
                if (interaction.options.getString('value')) {
                    if (interaction.member.permissions.has('MANAGE_NICKNAMES')) {   
                        await client.guilds.cache.get(interaction.guild.id).members.cache.get(client.user.id).setNickname(interaction.options.getString('value'));
                        await interaction.reply({
                            content: `Successfully changed my nickname to \`${interaction.options.getString('value')}\`!`,
                            ephemeral: true,
                        });
                    } else {
                        await interaction.reply({
                            content: 'You don\'t have the permission to change my nickname!',
                            ephemeral: true,
                        });
                    }
                } else {
                    await interaction.reply({
                        content: 'Please specify a nickname!',
                        ephemeral: true,
                    });
                }
                break;
            default:
                const embed = new EmbedBuilder()
                    .setTitle('Settings')
                    .setDescription('Change the configuration of the bot (based on your access level).')
                break;
        }
    },
};