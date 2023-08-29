module.exports = {
    name: "play",
    aliases: ["p"],
    $if: "old",
    code: `
        $playTrack[$message audio;youtube]
        $if[$hasPlayer==false]
        $joinVC[$voiceID;yes;no;yes;default;yes]
        $endif
        $onlyClientPerms[speak;connect;{newEmbed:{description::question_mark: I require these permissions to work: **Speak** and **Connect**}{color:Random}{delete:15s}}]
        $onlyIf[$voiceID!=;{newEmbed:{description:You must be in a Voice Channel!}{color:Random}{delete:5s}}]
        $onlyIf[$message!=;{newEmbed:{description: You have to specify a song name/url to play!}{color:Random}{delete:5s}}]
        $onlyIf[$checkContains[$channelType;text;news]==true;]
        $deleteCommand
        $deleteIn[7s]
    `
}