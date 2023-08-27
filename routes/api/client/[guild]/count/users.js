module.exports = function (app, context) {
    bot = context.bot;

    app.get("/api/client/guild/:guild/count/users", (req, res) => {
        let guild = bot.guilds.cache.get(req.params.guild);
        if (!guild) return res.send("Guild not found.");
        res.send({
            estimated_users: guild.memberCount || 0
        });
    });
}