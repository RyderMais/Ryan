const Discord = require("discord.js");
const fs = require('fs');
const Moment = require('moment');

exports.conf = {
    aliases: ['memory', 'ram']
};
exports.help = {
    name: "[BOT OWNER] Memory RAM Checker", description: "-", usage: "ram"
};
exports.run = async (client, message) =>  {

    m = await message.reply(":clock:");

    var os = require("os");
    function cpuAverage() {

    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    for(var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        for(type in cpu.times) {
        totalTick += cpu.times[type];
    }
        totalIdle += cpu.times.idle;
    }
        return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
    }

    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    async function CPULoad(avgTime, callback) {
        this.samples = [];
        this.samples[1] = cpuAverage();
        /*this.refresh = setInterval(() => {*/
          await sleep(avgTime);
          this.samples[0] = this.samples[1];
          this.samples[1] = cpuAverage();
          var totalDiff = this.samples[1].total - this.samples[0].total;
          var idleDiff = this.samples[1].idle - this.samples[0].idle;
          callback(1 - idleDiff / totalDiff);
        /* }, avgTime);*/
      }

    function send(msg, ram, cpu, uptime) {
        m.edit(`**Estatísticas:**\r> :frog: **RAM:** \`${ram}\`MB (\`${Math.round((ram * 100)/ 512)}\`%)\r>>> :oil: **CPU:** \`${(cpu*100).toFixed(1)}\`%\r\r:clock11: **UPTIME**: Há ${uptime}`)
    }
    time = Moment.duration(process.uptime() * 1000).humanize();

    ram = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 10) / 10;
    cpu = Math.round(process.cpuUsage().system)

    CPULoad(1000, (load) => send(message, ram, load, time));
      
}