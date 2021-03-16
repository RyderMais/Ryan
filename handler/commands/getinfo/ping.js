exports.conf = {
    aliases: ['ping']
};
exports.help = {
    name: "Ping", description: "Latency test", usage: "ping"
};
exports.run = async (client, message) =>  {
    let m = await message.channel.send("Ping?");
    m.edit(`:ping_pong: **Pong!**  Ping de **${m.createdTimestamp - message.createdTimestamp}ms**, API com **${Math.round(client.ping)}ms** de latência!`);
    client.globalPresets.statusTimeout = 2;
    console.log("OK");
}