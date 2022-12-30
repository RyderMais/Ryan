const { readdirSync } = require('fs');

module.exports = (client) => {
    const load = async dirs => {
        const events = readdirSync(`./src/events/${dirs}`).filter((file) => file.endsWith('.js'));

        for (const file of events) {
            const pull = require(`../events/${dirs}/${file}`);
            let eventName = file.split('.')[0];

            console.log(`Loaded event ${eventName}.`);

            client.on(eventName, pull.bind(null, client));
        }
    };
    readdirSync('./src/events/').forEach((dir) => load(dir));
}