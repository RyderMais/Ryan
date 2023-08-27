module.exports = {
    name: "ping",
    aliases: ["pong", "latency", "lat", "test"],
    /*code: `
        $title[RAM Usage]
        $description[**Bot Process Info**
            \`\`\`md
            OS:$cpu[os]%
            CPU:$cpu[process]%
            // show ram usage in MB (with percentage)
            RAM:$roundTenth[$ram;2]MB / $round[$maxRam]MB ($replaceText[$replaceText[$checkCondition[$maxRam==0];true;0];false;$roundTenth[$divide[$ram;$maxRam];2]]%)
            Ping:$pingms
            Message Latency:$messagePingms
            Database Latency:$databasePingms
            Uptime:$uptime[humanize]
            \`\`\`
            ]

        $addField[**OS Info**; 
            `
    */
    code: `
        $description[**:clock1: Bot Process Info**]
        $addField[**Database Latency**; $databasePingms; true]
        $addField[**Message Latency**; $messagePingms\nOS:$cpu[os]; true]
        $addField[**Ping**; $pingms; true]
        $color[#363187]
        $cooldown[30s; Hey...? Slow down!\n(_you can use it again in \`%time%\`_)]
        $footer[Requested by $username; $userAvatar[$authorID]]
        $addTimestamp
        $deleteCommand
        $deleteIn[10s]
        $color[#00E88F]
    `   
}