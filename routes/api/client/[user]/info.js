module.exports = function (app, context) {
    bot = context.bot;

    app.get("/api/client/user/:user/info", (req, res) => {
        let user = bot.users.cache.get(req.params.user);
        if (!user) return res.send("User not found.");
        let response = {
            "username": user.username || undefined,
            "id": user.id || undefined,
            "discriminator": user.discriminator || undefined,
            "avatarURL": user.avatarURL() || undefined,
            "bot": user.bot || undefined,
            "createdAt": user.createdAt || undefined,
            "flags": user.flags || undefined,
            "tag": user.tag || undefined,
            "avatar": user.avatar || undefined,
            "displayAvatarURL": user.displayAvatarURL() || undefined,
            "servers": user.client.guilds.cache.map(guild => {
                return {
                    "name": guild.name,
                    "id": guild.id,
                    "iconURL": guild.iconURL() || undefined,
                    "owner": guild.ownerID == user.id
                }
            }) || undefined
        };
        res.send(response);
    });
}