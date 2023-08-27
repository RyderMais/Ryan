module.exports = async (client, member) => {
    const guild = client.guilds.cache.get('GUILD_ID');
    const channel = guild.channels.cache.get('CHANNEL_ID');

    await member.roles.add('ROLE_ID');

    let embed = new EmbedBuilder()
        .setTitle('Welcome!')
        .setDescription(`Welcome to ${guild.name}, ${member.user.username}!`)
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setFooter({ text: 'Made with ☕ by @Bryceed#8168' })
        .setThumbnail({ url: member.user.displayAvatarURL({ dynamic: true }) })
        .addFields([
            {
                name: 'Member Count',
                value: guild.memberCount,
                inline: true,
            },
            {
                name: 'User Tag',
                value: member.user.tag,
                inline: true,
            },
            {
                name: 'User ID',
                value: member.user.id,
                inline: true,
            },
        ]);
    
    await channel.send({ embeds: [embed] });
}
