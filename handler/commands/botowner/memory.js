const Discord = require("discord.js");
const fs = require('fs');
const Moment = require('moment');

exports.conf = {
    aliases: ['memory', 'ram', 'memoria']
};
exports.help = {
    name: "[BOT OWNER] Memory RAM Checker", description: "-", usage: "ram"
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
    const ramPercent = (os.freemem() / os.totalmem()) * 100;
    const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
    const ramFree = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

    const cpuUpTime = Moment.duration(os.uptime() * 1000).humanize();

    let embed = new Discord.MessageEmbed()
        // color green if ram is below 60%, yellow if between 60% and 85%, red if above 85%
        .setColor(ramPercent < 60 ? '#00ff00' : ramPercent < 85 ? '#ffff00' : '#ff0000')
        .setTitle('Uso de Memória RAM')
        .setDescription(
            `**RAM USAGE:** ${Math.round(ramPercent)}%\r` +
            `**TOTAL:** \`${ramFree}\`/${ramTotal} GB\r\r`+
            `>>> **UPTIME**: Há ${cpuUpTime}`
        )
        // add the bot image in footer
        .setFooter(`${client.user.username} ©️ ${new Date().getFullYear()}`, client.user.avatarURL())
        .setTimestamp();

    m.edit(embed).then(() => {
        m.delete({ timeout: 15000 });
        message.delete({ timeout: 15000 });
    });
      
}