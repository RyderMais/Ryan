module.exports = function (app, context) {
    bot = context.bot;

    app.get("/api/client/guild/:guild/users", (req, res) => {
        let guild = bot.guilds.cache.get(req.params.guild);
        if (!guild) return res.send("Guild not found.");
        let response = {
            "users": guild.members.cache.map(member => {
                return {
                    "username": member.user.username || undefined,
                    "id": member.user.id || undefined,
                    "discriminator": member.user.discriminator || undefined,
                    "avatarURL": member.user.avatarURL() || undefined,
                    "bot": member.user.bot || undefined,
                    "createdAt": member.user.createdAt || undefined,
                    "flags": member.user.flags || undefined,
                    "tag": member.user.tag || undefined,
                    "avatar": member.user.avatar || undefined,
                    "displayAvatarURL": member.user.displayAvatarURL() || undefined,
                    "roles": member.roles.cache.map(role => {
                        return {
                            "name": role.name,
                            "id": role.id,
                            "color": role.hexColor,
                            "hoist": role.hoist,
                            "position": role.position,
                            "permissions": role.permissions,
                            "managed": role.managed,
                            "mentionable": role.mentionable
                        }
                    }) || undefined,
                    "joinedAt": member.joinedAt || undefined,
                    "nickname": member.nickname || undefined
                }
            }) || undefined
        };
        res.send(response);
    }
    );
}