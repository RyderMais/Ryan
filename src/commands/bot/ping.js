const {
    ApplicationCommandType,
} = require("discord.js");
const fs = require("fs");
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));

module.exports = {
    name: "ping",
    description:
        "Check the internet latency between the bot and the Discord API.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args) => {
        if (!client.user) return;
        if (!interaction.guild) return;

        const sent = await interaction.reply({
            content: ":man_shrugging: Ping?",
            fetchReply: true,
            ephemeral: true,
        });

        await interaction.editReply(
            `:ping_pong: Pong!\n\n` +

            `> **Communication Latency:** ${sent.createdTimestamp - interaction.createdTimestamp}ms.\n` +
            `> **API Latency:** ${
                interaction.client.ws.ping
            }ms.\n`
        );
    },
};
