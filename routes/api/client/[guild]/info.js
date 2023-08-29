module.exports = function (app, context) {
    bot = context.bot;

    app.get("/api/client/guild/:guild/info", (req, res) => {
        let guild = bot.guilds.cache.get(req.params.guild);
        if (!guild) return res.send("Guild not found.");
        let response = {
            "name": guild.name || undefined,
            "id": guild.id || undefined,
            "ownerID": guild.ownerID || undefined,
            "region": guild.region || undefined,
            "memberCount": guild.memberCount || undefined,
            "createdAt": guild.createdAt || undefined,
            "iconURL": guild.iconURL() || undefined,
            "bannerURL": guild.bannerURL() || undefined,
            "splashURL": guild.splashURL() || undefined,
            "afkChannel": guild.afkChannel || undefined,
            "afkTimeout": guild.afkTimeout || undefined,
            "systemChannel": guild.systemChannel || undefined,
            "systemChannelFlags": guild.systemChannelFlags || undefined,
            "verificationLevel": guild.verificationLevel || undefined,
            "explicitContentFilter": guild.explicitContentFilter || undefined,
            "mfaLevel": guild.mfaLevel || undefined,
            "premiumTier": guild.premiumTier || undefined,
            "premiumSubscriptionCount": guild.premiumSubscriptionCount || undefined,
            "vanityURLCode": guild.vanityURLCode || undefined,
            "description": guild.description || undefined,
            "features": guild.features || undefined,
            "emojis": guild.emojis.cache.map(emoji => emoji.toString()) || undefined,
            // roles: ["name", "color", "totalMembers", "position", "hexColor"]
            "roles": guild.roles.cache.map(role => {
                return {
                    "name": role.name,
                    "hexColor": (role.color == 0) ? null : role.hexColor,
                    "position": role.position,
                }
            }).sort((a, b) => b.position - a.position) || undefined,
            "channels": guild.channels.cache.map(channel => {
                return {
                    "name": channel.name,
                    "type": channel.type,
                    "id": channel.id,
                    "position": channel.position,
                    "parent": channel.parent || undefined,
                }
            }).sort((a, b) => b.position - a.position) || undefined,
            "members": guild.members.cache.map(member => member.toString()) || undefined,
        };
        res.send(response);
    });
};