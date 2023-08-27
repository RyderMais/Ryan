module.exports = {
    name: "uptime",
    aliases: ["uptime"],
    category: "host",
    description: "Check the bot's uptime!",
    code: `
        $description[**:clock1: Server Uptime**]
        $addField[Online for; $uptime; true]
        $cooldown[15s; Hey...? Slow down!\n(_you can use it again in \`%time%\`_)]
        $footer[Requested by $username; $userAvatar[$authorID]]
        $addTimestamp
        $deleteCommand
        $deleteIn[5s]
        $color[#00E88F]
    `
}