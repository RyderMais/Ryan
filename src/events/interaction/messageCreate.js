const { Colors, EmbedBuilder } = require('discord.js');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    let commands = client.commands;
    let fields = [];
    commands.forEach((command) => {
        fields.push({
            name: "/" + command.name,
            value: command.description,
        });
    })

    if (message.mentions.has(client.user)) {
        let embed = new EmbedBuilder()
            .setDescription('Commands (/help)')
            .setColor('DarkButNotBlack')
            .setTimestamp()
            .setFooter({ text: 'Made with ☕ by @Bryceed#8168' })
            .addFields(fields);
        await message.reply({ content: '**Hi! Are you trying to use some command?**\nPlease, use the slash command `/help` with my profile image.', ephemeral: true }).then(msg => {
            setTimeout(() => {
                msg.delete();
                message.delete();
            }, 10000);
        });
    }
}