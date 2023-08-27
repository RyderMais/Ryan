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
        auto_tran: "false",
        SYS_OS: os.platform(),
        SYS_ARCH: os.arch(),
        SYS_RAM: os.totalmem(),
        SYS_CPU: os.cpus()[0].model,
        SYS_CPU_THREADS: os.cpus().length,
        SYS_STORAGE_SIZE: os.totalmem(),
        SYS_STORAGE_FREE: os.freemem(),
        SYS_STORAGE_USED: os.totalmem() - os.freemem(),
        SYS_STORAGE_USED_PERCENTAGE: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100,
        SYS_STORAGE_FREE_PERCENTAGE: (os.freemem() / os.totalmem()) * 100,
        SYS_UPTIME: os.uptime(),
        SYS_UPTIME_HUMAN: os.uptime() * 1000,
        SYS_HOSTNAME: os.hostname(),
        SYS_USER: os.userInfo().username,
        SYS_USER_ID: os.userInfo().uid,
    });
};
