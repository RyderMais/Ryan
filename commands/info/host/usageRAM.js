module.exports = {
    name: "ramUsage",
    aliases: ["ram-usage", "ramusage", "ram"],
    code: `
        $description[**:clock1: RAM Usage**]
        $addField[**Percentage**; $replaceText[$replaceText[$checkCondition[$maxRam==0];true;0];false;$roundTenth[$divide[$ram;$maxRam];1]]%; true]
        $addField[**In use**; $roundTenth[$ram;2]MB (of $roundTenth[$divide[$maxRam;1024];2]GB); true]
        $color[#363187]
        $cooldown[30s; Hey...? Slow down!\n(_you can use it again in \`%time%\`_)]
        $footer[Requested by $username; $userAvatar[$authorID]]
        $addTimestamp
        $deleteCommand
        $deleteIn[10s]
        $color[#00E88F]
    `
}