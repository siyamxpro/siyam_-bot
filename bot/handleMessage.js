const utils = require("../utils");

module.exports = async function handleMessage(bot, message) {
    const text = utils.getText(message).trim();
    if (!text) return;

    const config = global.GoatBot.config;
    const prefix = config.prefix || "!";

    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/\s+/);
    const commandName = (args.shift() || "").toLowerCase();

    if (!commandName) return;

    const command = global.GoatBot.commands.get(commandName);

    if (!command) return;

    if (typeof command.onStart !== "function") {
        return bot.sendMessage(message.chat.id, "এই কমান্ডটি এখনো প্রস্তুত নয়।");
    }

    const context = {
        api: bot,
        bot,
        event: message,
        message,
        args,
        body: text,
        threadID: String(message.chat.id),
        senderID: String(message.from.id),
        userID: String(message.from.id),
        reply: (msg, options = {}) =>
            bot.sendMessage(message.chat.id, String(msg), options)
    };

    await command.onStart(context);
};
