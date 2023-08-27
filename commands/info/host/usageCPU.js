module.exports = {
    name: "cpu",
    aliases: ["cpuusage", "cpu-usage", "cpuinfo", "cpu-info"],
    code: `
        $description[**:clock1: Bot Process Info**]
        $addField[**CPU Usage**; $cpu[process]%; true]
        $addField[**OS**; $cpu[os]; true]
        $color[#363187]
        $cooldown[30s; Hey...? Slow down!\n(_you can use it again in \`%time%\`_)]
        $footer[Requested by $username; $userAvatar[$authorID]]
        $addTimestamp
        $deleteCommand
        $deleteIn[10s]
        $color[#00E88F]
    `   
}