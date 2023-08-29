module.exports = function(app, context) {
    app.get('/api/client/uptime', function (req, res) {
        res.send({
            ping: context.bot.ws.ping,
        });
    });
};