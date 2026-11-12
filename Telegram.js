const TelegramBot = require("node-telegram-bot-api");
const config = require("./config.json");
const loadScripts = require("./bot/loadScripts");
const handleMessage = require("./bot/handlerEvents");
const loadData = require("./bot/loadData");

if (!config.botToken || config.botToken === "YOUR_BOT_TOKEN") {
    console.error("Telegram bot token is missing in config.json");
    process.exit(1);
}

const bot = new TelegramBot(config.botToken, {
    polling: true
});

global.GoatBot = {
    bot,
    commands: new Map(),
    events: new Map(),
    config,
    data: {}
};

async function start() {
    try {
        await loadData();
        await loadScripts(bot);

        bot.on("message", message => {
            handleMessage(bot, message).catch(console.error);
        });

        bot.on("polling_error", error => {
            console.error("[Telegram Polling]", error.message);
        });

        console.log("Telegram bot is running!");
    } catch (error) {
        console.error("Bot startup failed:", error);
        process.exit(1);
    }
}

start();
