exports.config = {
    name: 'ready',
    description: 'This event is called when the bot is loaded and ready to use.',
}
exports.run = async (client) => {
    console.log('Ready!');
}