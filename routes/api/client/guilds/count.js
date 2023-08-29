module.exports = function(app, context) {
    app.get('/api/client/guilds/count', function (req, res) {
        res.send({
            estimated_guilds: context.bot.guilds.cache.size
        });
    });
};