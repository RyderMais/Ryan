module.exports = {
    type:"interaction",
    prototype: "slash",
    name: "play",
    code: `
    $if[$voiceID[$clientID]==]
    $joinVC[$voiceID]
    $endIf
    $playTrack[$message audio;youtube]
    $if[$hasPlayer==false]
    $joinVC
    $deleteCommand
    $endIf
    `
}