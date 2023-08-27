module.exports = {
    name: "ramUsage",
    aliases: ["ram-usage", "ramusage", "ram"],
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
        $description[**This is the status of the current process:**]
        $addField[**Percentage**; $replaceText[$replaceText[$checkCondition[$maxRam==0];true;0];false;$roundTenth[$divide[$ram;$maxRam];1]]%; true]
        $addField[**In use**; $roundTenth[$ram;2]MB (of $roundTenth[$divide[$maxRam;1024];2]GB); true]
        $color[#363187]
        $cooldown[60s; Hey...? Slow down!\n(_you can use it again in \`%time%\`_)]
        $footer[Requested by $username; $userAvatar[$authorID]]
        $addTimestamp
    `
}