module.exports = {
    type: "voiceStateUpdate",
    channel: "$channelID",
    code: `
    $if[$voiceID[$authorID]==]
    $if[$voiceID[$clientID]==]
    $else
    $log[Left voice channel.]
    `
}