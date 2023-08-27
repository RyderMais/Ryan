require("dotenv").config();
const token_type = process.env.DISCORD_OPERATOR;
const token = process.env.DISCORD_TOKEN;
const { AoiClient, LoadCommands, AoiInviteSystem, Util } = require("aoi.js");
const { AoiVoice, PluginName, PlayerEvents, Cacher, Filter } = require(`@akarui/aoi.music`);
const { setup } = require("@akarui/aoi.parser");
const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const fs = require("fs");
const port = (token_type == "STABLE") ? 8080 : 3004;

const bot = new AoiClient({
    token: token,
    prefix: (token_type == "STABLE") ? process.env.DISCORD_PREFIX : "--",
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates", "GuildMembers", "GuildBans", "GuildEmojisAndStickers", "GuildIntegrations", "GuildWebhooks", "GuildInvites", "GuildVoiceStates", "GuildPresences", "GuildMessageReactions", "GuildMessageTyping", "DirectMessages", "DirectMessageReactions", "DirectMessageTyping"],
    events:["onMessage", "onInteractionCreate","onGuildJoin","onMessageUpdate","onFunctionError","onVoiceStateUpdate","onJoin","onLeave","onChannelDelete","onEmojiCreate"],
    suppressAllErrors: (token_type == "STABLE") ? true : false,
    errorMessage: "⚠️ **There's an error. Here we go again...**\nThis can be situacional by some instability or, if persists, contact the developer for bugfixes.",
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    },
    fetchInvites: {
        cacheInviters: true,
        enabled: true,
    },
    aoiAutoUpdate: true
});


bot.status({
    text:"$allMembersCount users",
    type: "WATCHING",
    status: "idle",
    afk: true,
    time: 10
})
bot.status({
    text:"$guildCount servers",
    type: "WATCHING",
    status: "idle",
    afk: true,
    time: 10
})
bot.status({
    text: "ryan.rydermais.com",
    url: "https://ryan.rydermais.com",
    type: "STREAMING",
    status: "idle",
    afk: true,
    time: 20
})
    

bot.readyCommand({
    channel: "",
    code: `  
    $log[
      ─━━━━━━━━━Ready━━━━━━━━━─
      Client: $userTag[$clientID]
      Ping: $ping ms | Servers: $guildCount | Users: $allMembersCount
      Bot Creator: $username[$clientOwnerIDs]#$discriminator[$clientOwnerIDs]
      Commands loaded: $commandsCount
      Panel: http://localhost:`+ port +`
      ─━━━━━━━━━━━━━━━━━━━━━━━━─
    ];
    $log[Logging in with ` + token_type + ` token...];
    $sendDM[{newEmbed: {title:\:white_check_mark\:$username[$clientID]#$discriminator[$clientID] is online!}{color:#27217E}
    {field:Ping: $ping ms:yes}
    {field:Guilds: $guildCount:yes}
    {field:Users: $allMembersCount:yes}
    {field:Commands: $commandsCount:yes}
    {field:Port: `+ port +`:yes}
    {field:Env: ` + token_type + `:yes}
    };$clientOwnerIDs];
    $eval[startAPI()];
    `, 
    executeOnStartup: true,
}),

require('./database/variables.js')(bot);

const voice = new AoiVoice(bot, {
    searchOptions: {
        youtubeClient: "WEB",
        youtubegl: "BR",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
        youtubePlaylistLimit: 10,
    },
    devOptions: {
        debug: (token_type == "STABLE") ? false : true,
    },
});
voice.addPlugin(PluginName.Cacher, new Cacher("disk"));
voice.addPlugin(PluginName.Filter, new Filter({
    filterFromStart: true,
}));
voice.addEvent(PlayerEvents.TrackStart);
voice.addEvent(PlayerEvents.TrackEnd);
voice.addEvent(PlayerEvents.QueueStart);
voice.addEvent(PlayerEvents.QueueEnd);


const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/")
loader.load(bot.cmd, "./interactions/")
loader.load(bot.cmd, "./events/client/")
loader.load(voice.cmds, "./events/voice/");
voice.bindExecutor(bot.functionManager.interpreter);

setup(Util);


// or enable CORS for specific origins
const whitelistCORS = [
    'https://ryan.rydermais.com',
    'https://ryan.discloud.app',
    'https://rydermais.com',
    'https://rydermais.discloud.app',
    'http://localhost:3004',
];

// if not stable, add localhost scenarios to whitelist
whitelistCORS.push("http://localhost:" + port);
whitelistCORS.push("http://localhost:8080");
whitelistCORS.push("http://localhost");
whitelistCORS.push("https://localhost");

// when path start with "/api", always return in JSON format
app.use("/api", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(
    cors({
        origin: function (req, callback) {
            // get node env to allow localhost on development
            let origin = (process.env.NODE_ENV == "production") ? req : null;
            // if origin is null, allow localhost
            if (whitelistCORS.indexOf(origin) !== -1 || origin == null) {
                callback(null, true)
            } else {
                callback(new Error('Requests under "' + origin + '" origin aren\'t allowed by CORS'))
            }
        }
    })
);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/api", (req, res) => {
    // list all routes
    let routes = {}
    // route, methods and file path
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            routes[r.route.path] = {
                "methods": Object.keys(r.route.methods).toString().toUpperCase(),
                // file from root project
                "relFile": r.route.path,
            };
        }
    });
    res.send({
        "total": Object.keys(routes).length,
        "routes": routes,
    });
});
loadRoutes(path.join(__dirname, './routes'), { bot });
startAPI()


function loadRoutes(folderPath, contextVars) {
    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            loadRoutes(filePath, contextVars);
        } else if (file.endsWith('.js')) {
            const routeModule = require(filePath);
            routeModule(app, contextVars);
        }
    });
}
async function startAPI() {
    if (token_type == "STABLE") {
        try {
            await app.listen(port, () => {
                console.log(`REST API running locally at http://localhost:${port}`);
            });
        } catch (error) {
            console.error(`Web page failed to start since the port ${port} is already in use.`);
        }
        return;
    }
    let attempts = 0;
    while (attempts < 10) {
        try {
            await app.listen(port, () => {
                console.log(`REST API running locally at http://localhost:${port}`);
            });
            break;
        } catch (error) {
            attempts++;
            if (attempts >= 10) {
                console.error("Web page failed to start since the original port and 10 random ports were already in use.");
                break;
            }
            port = Math.floor(Math.random() * 10000);
        }
    }
}