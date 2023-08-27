module.exports = {
    config: {
        name: 'support server',
        customId: 'support-server',
    },
    run: async (client, interaction) => {
        interaction.reply({ content: `Need help or want to join into my community? Join at the **RYDERMAIS** server!\n\n`, ephemeral: true });
    }
}
