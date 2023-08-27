module.exports = function (app, context) {
    bot = context.bot;
    app.get('/api/client/guilds/list', function (req, res) {
        let guilds = [];
        let id = [];
        bot.guilds.cache.forEach(guild => {
            guilds.push(guild.name);
            id.push(guild.id);
        });
        res.send(`{"guilds": {${id.map((id, index) => `"${id}": "${guilds[index]}"`).join(", ")}}}`);
    });
};