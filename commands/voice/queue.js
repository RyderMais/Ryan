module.exports = {
    name: "queue",
    aliases: ["q", "list", "songlist", "song-list", "songs"],
    code: `
    $queue[1;1;{position}.] $queue[1;1;{title} -] $humanizems[$queue[1;1;{duration}]] $queue[1;1;| {requester.nickname}]
    $onlyIf[$hasPlayer!=true;{description:There are no songs in queue!}{color:RANDOM}{delete:5s}]
    $onlyIf[$checkContains[$channelType;text;news]==true;]
    $deleteCommand
    $deleteIn[15s]
    `
}