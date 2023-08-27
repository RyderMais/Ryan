bot.createApplicationCommandData({
    type: "CHAT_INPUT",
    name: "play",
    description: "Play an audio source into a voice channel.",
    options: [
        {
            name: "search",
            description: "Set the search query or URL to play.",
            required: true,
            type: "STRING"
        },
        {
            name: "provider",
            description: "Set the provider to use (when searching).",
            required: false,
            // use dropdown for provider selection
            type: "STRING",
            choices: [
                {
                    name: "YouTube",
                    value: "youtube"
                },
                {
                    name: "SoundCloud",
                    value: "soundcloud"
                },
            ]
        }
    ]
})