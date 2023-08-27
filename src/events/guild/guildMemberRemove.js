module.exports = async (client, member) => {
    // leave
    const guild = client.guilds.cache.get('GUILD_ID');
    const channel = guild.channels.cache.get('CHANNEL_ID');

    let embed = new EmbedBuilder()
        .setTitle('Goodbye!')
        .setDescription(`Goodbye ${member.user.username}!`)
        .setColor('DarkButNotBlack')
        .setTimestamp()
        .setFooter({ text: 'Made with ☕ by @Bryceed#8168' })
        .setThumbnail({ url: member.user.displayAvatarURL({ dynamic: true }) })
    
    await channel.send({ embeds: [embed] });
}