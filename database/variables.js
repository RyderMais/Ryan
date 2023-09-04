const os = require("os");
const cpu = require("cpu-stat");

module.exports = bot => {
    bot.variables({
        prefix: process.env.DISCORD_PREFIX || "-",
        muterole: 0,
        warns: 0,
        start: false,
        credits: 0,
        tick_e: "false",
        tick_r: "",
        tick: "false",
        tick_c: "0",
        transcript_channel: "$channelID",
        tick_describe: "Hey, this is your ticket. Support will arrive shortly.",
        panel_title: "Open a ticket",
        ticket_title: "Ticket",
        panel_desc: "Click the button to open a ticket!",
        button_name: "Open ticket",
        ch_name: "tick",
        auto_tran: "false"
    });
};
