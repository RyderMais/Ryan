exports.conf = {
  aliases: ['bot', 'robô', 'robot', 'host', 'vps']
};
exports.help = {
  name: "Bot", description: "Latency test", usage: "bot"
};
exports.run = async (client, message, args) =>  {
  switch(args.shift(2).toLowerCase()){
    case "reload":
    case "recarregar":
    case "restart":
    case "reiniciar":
      if(client.config.presets.botOwner === message.author.id) {
        let embed = {
          "description": "Finalizando...",
          "color": 11338242
        }
        message.reply("Irei encerrar meu serviço, mas só irei reiniciar com ajuda de algum outro módulo (como o PM2, Nodemon ou similar).", {embed});
        process.once('RELOADME', function () {
          wait(2);
          client.runTime;
        });
      }else{
        let embed = {
          "description": "**Apenas o dono(a) do bot pode executar esse comando.**\r> Caso esteja hospedando o repositório da Mizuki no GitHub, você precisará colocar seu ID na configuração do bot.",
          "color": 11338242
        }
        message.reply("Irei encerrar meu serviço, mas só irei reiniciar com ajuda de algum outro módulo (como o PM2, Nodemon ou similar).", {embed});
      }
      break;
  };
}
