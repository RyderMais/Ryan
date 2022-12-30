const { Colors, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');
const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const process = require('process');

module.exports = {
    name: 'about',
    description: 'Information about the bot.',
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        const embed = new EmbedBuilder()
            .setTitle('About')
            .setDescription(`My name is **${client.user.username}** \`${client.user.tag}\`\n\n I'm currently working on ${client.guilds.cache.size} servers for approximately ${client.users.cache.size} users! :tada:\n\n> ✨  **DETAILS** `)
            .setFields([
                {
                    name: 'Version',
                    value: `${package.version || '*unknown*'}`,
                    inline: true,
                },
                {
                    name: 'Developer',
                    value: `${package.author || '*unknown*'} \`${package.author_discord || ''}\``,
                    inline: true,
                },
                {
                    name: 'GitHub',
                    value: `${package.repository.url || '*unknown*'}`,
                },
                {
                    name: 'License',
                    value: `${package.license || '*unknown*'}`,
                    inline: true,
                },
                {
                    name: 'Node.js',
                    value: `${process.version.split('.')[0]}`,
                    inline: true,
                },
                {
                    name: 'Uptime',
                    value: `${process.uptime().toFixed(2)} seconds`,
                    inline: true,
                },
                {
                    name: 'Used Memory',
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB`,
                    inline: true,
                },
                {
                    name: 'Server',
                    value: `${process.platform} ${process.arch}`,
                    inline: true,
                },

            ])
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setFooter({ text: `Support: 📨 ${package.author_email || '-'}` })
        
        await interaction.reply({ embeds: [embed] });
    }
};
