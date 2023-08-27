const { Colors, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Get the avatar of the selected user, or your own avatar.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'The user to get the avatar from.',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    run: async (client, interaction, args) => {
        let userMention = interaction.options.getUser('user');
        let person;

        if(!userMention) {
            person = interaction.user;
        }
        else {
            person = userMention;
        }

        const embed = new EmbedBuilder()
            .addFields([
                {
                    name: 'Avatar',
                    value: `[Click here](${person.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })})`,
                },
            ])
            .setImage(person.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))

        await interaction.reply({ embeds: [embed] });
    }
};