const Discord = require("discord.js");
const fs = require('fs');
const Moment = require('moment');

exports.conf = {
    aliases: ['cpu', 'cpu-usage']
};
exports.help = {
    name: "[BOT OWNER] Memory RAM Checker", description: "-", usage: "cpu"
};
exports.run = async (client, message) =>  {

    m = await message.reply(":clock:");

    const os = require('os');
    const cpu = os.cpus();
    const cpuUsage = cpu.map(c => c.times);
    const cpuTotalTime = cpuUsage.reduce((acc, cur) => {
        return {
            user: acc.user + cur.user,
            nice: acc.nice + cur.nice,
            sys: acc.sys + cur.sys,
            idle: acc.idle + cur.idle,
            irq: acc.irq + cur.irq
        };
    });
    const cpuPercent = (cpuTotalTime.user + cpuTotalTime.nice + cpuTotalTime.sys) / (cpuTotalTime.idle + cpuTotalTime.irq) * 100;

    const cpuStats = {
        model: cpu[0].model,
        speed: (cpu[0].speed / 1024).toFixed(2),
        cores: cpu.length,
        arch: os.arch(),
        so: os.platform(),
    }   
    const cpuUptime = Moment.duration(os.uptime() * 1000).humanize();

    let embed = new Discord.MessageEmbed()
        // color green if cpu or ram is below 60%, yellow if between 60% and 85%, red if above 85%
        .setColor(cpuPercent < 60 ? '#00ff00' : cpuPercent < 85 ? '#ffff00' : '#ff0000')
        .setTitle(`Uso de CPU (${Math.round(cpuPercent)}%)`)
        .setDescription(
            `:floppy_disk: **${cpuStats.so} (${cpuStats.arch})**\r` +
            `*${cpuStats.model}*\r\r`+
            `> **Utilização:** ${Math.round(cpuPercent)}%\r` +
            `> **Velocidade:** ${cpuStats.speed} GHz\r`+
            `> **Núcleos:** ${cpuStats.cores}\r\r`+
            `**SYSTEM UPTIME**: ${cpuUptime}`
        )
        // add the bot image in footer
        .setFooter(`${client.user.username} ©️ ${new Date().getFullYear()}`, client.user.avatarURL())
        .setTimestamp();

    m.edit(embed).then(() => {
        m.delete({ timeout: 15000 });
        message.delete({ timeout: 15000 });
    });
}