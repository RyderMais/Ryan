module.exports = {
    config: {
        name: 'invite bot',
        customId: 'invite-bot',
    },
    run: async (client, interaction) => {
        if (!interaction.isButton()) return;
        interaction.reply({ content: 'Invite me to your server!', ephemeral: true });
    }
}