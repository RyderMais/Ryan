const Discord = require("discord.js");

exports.conf = {
  aliases: ['support', 'suport', 'ticket']
};
exports.help = {
  name: "Support Ticket", description: "Start help request inside of server", usage: "ticket"
};
exports.run = async (client, message, args) =>  {
	switch(args.shift(1).toLowerCase()){
		case "new":
		case "open":
		case "start":
		case "novo":
		case "nuevo":
		case "abrir":
		case "abra":
		case "inicia":
		case "iniciar":
			if (!message.channel.guild) return;
			let modlog = client.channels.find('name', '');
			if (!modlog) return message.channel.reply('**No momento, esse comando está limitado apenas **').then(m => m.delete(5000));
			message.channel.sendMessage(``).then(msg => {
				msg.react('✅')
				.then(() => msg.react('✅'))

			let activeFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
			let active = msg.createReactionCollector(activeFilter, { time: 15000 });

			active.on("collect", r => {
				if (
					message.guild.channels.exists(
					"name",
					`ticket-${message.author.id}`
				)
			)
        	return;

			message.guild
			.createChannel(`ticket-${message.author.id}`, "text")
			.then(c => {
			let category = server.channels.find(c => c.name == "❓ Support Ticket" && c.type == "category");
			c.setParent(category.id);
			let role = message.guild.roles.find("name", "🕵️‍♂️ Guardians");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "🔮 BOTs Legion");
			c.overwritePermissions(role, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true
			});
			c.overwritePermissions(role2, {
				SEND_MESSAGES: false,
				READ_MESSAGES: false
			});
			c.overwritePermissions(message.author, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true
			});
			c.overwritePermissions(role3, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true
			});

			const embed = new Discord.RichEmbed()
			.setColor(0xcf40fa)
			.addField(
				`**Olá, ${message.author.username}!**`,
				`O suporte foi iniciado, sobre o que você precisa de ajuda?`,
				`> Adiante o assunto por aqui que logo alguém da equipe irá te responder.`
			)
			.setTimestamp();
			c.send({
				embed: embed
			})
			}).catch(console.error);
		})
	});
    break;
  	}
}