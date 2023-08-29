module.exports = function (app, context) {
    const bot = context.bot;
    app.get('/api/client/info', function (req, res) {
        if (!bot.users.cache.size) return res.send({
            "error": [
                "The system wasn't fully loaded yet. Please wait a few seconds and try again.",
                "If the problem persists, contact the developer.",
                "https://ryan.rydermais.com/contact"
            ],
            "status": {
                "uptime": bot.uptime,
                "ping": bot.ws.ping
            }
        });
        let _bot = { "info": bot.user };
        // add bot owner into bot info
        let _ownerID = bot.application.owner || null;
        // get the owner name at any guild cache. When the first result is found, stop the loop
        try {
            bot.guilds.cache.forEach(guild => {
                if (_ownerID) return;
                guild.members.cache.forEach(member => {
                    if (_ownerID) return;
                    if (member.user.id != bot.application.owner.id) return;
                    _ownerID = member.user;
                    console.log(_ownerID);
                });
            });
        } catch (error) {
            console.error(error);
        }
        if (_ownerID) {
            _bot.info.owner = {
                "username": _ownerID.username,
                "globalName": _ownerID.globalName,
                "discriminator": _ownerID.discriminator,
                "id": _ownerID.id,
                "avatarURL": `https://cdn.discordapp.com/avatars/${_ownerID.id}/${_ownerID.avatar}.png`,
                "bannerURL": `https://cdn.discordapp.com/banners/${_ownerID.id}/${_ownerID.banner}.png`,
                "accentColor": _ownerID.accentColor || 0,
                "accentColorHex": "#" + _ownerID.accentColor.toString(16).padStart(6, "0"),
            }
        } else {
            _bot.info.owner = {
                "username": "Unknown",
                "discriminator": "0000",
                "id": "0"
            }
        }
        // add bot invite link into bot info
        _bot.info.invite = `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot%20applications.commands&permissions=8`;
        let _stats = {
            "status": {
                "uptime": bot.uptime || undefined,
                "ping": bot.ws.ping || undefined,
                "guilds": bot.guilds.cache.size || undefined,
                "users": bot.users.cache.size || undefined
            }
        }
        res.send(Object.assign(_bot, _stats));
    });
};