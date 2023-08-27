const {
    Colors,
    EmbedBuilder,
    ApplicationCommandType,
    ApplicationCommandOptionType,
} = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const process = require("process");
const os = require("os");

module.exports = { 
    name: "ram",
    description:
        "Get information about the RAM usage of the bot.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args) => {
        if (!client.user) return;
        if (!interaction.guild) return;

        let _usedRam = process.memoryUsage().heapUsed / 1024 / 1024 / 1024;
        let _totalRam = os.totalmem() / 1024 / 1024 / 1024;
        let _freeRam = os.freemem() / 1024 / 1024 / 1024;

        const embed = new EmbedBuilder()
            //show percentual
            .setTitle(`RAM Usage (${(((_freeRam - _totalRam) / _totalRam * 100)+100).toFixed(1)}%)`)
            .setFields([
                {
                    name: "Bot Process",
                    value: `${_usedRam.toFixed(2)} ${_usedRam < 1 ? "MB" : "GB"}`,
                },
                {
                    name: "Server",
                    value: `${_freeRam.toFixed(2)} ${_freeRam < 1 ? "MB" : "GB"}/` +
                        `${_totalRam.toFixed(1)} ${_totalRam < 1 ? "MB" : "GB"}`,
                },
            ])
            .setTimestamp()
                
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};