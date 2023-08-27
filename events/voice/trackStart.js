module.exports = {
    channel: "$channelID",
    type: "trackStart",
    code: `
    $suppressErrors[Something went wrong!]
    $color[ff0000]
    $author[YouTube Music;https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/300px-YouTube_social_red_circle_%282017%29.svg.png?20220808215554]
    $thumbnail[$songInfo[thumbnail]]
    $description[Playing "**$songInfo[title]**" requested by $songInfo[requester]]
    $addField[Duration: ;$humanizeMS[$songInfo[duration]];true]
    $addField[Views: ;$abbreviate[$songInfo[views]];true]
    $addField[Queue: ;$if[$queueLength==0]No songs in queue!;$queueLength songs in queue!;true]
    $clientTyping[1s]
    $deleteIn[30s]
    `
}