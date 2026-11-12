const handleMessage = require("./handleMessage");

module.exports = async function handlerEvents(bot, message) {
    if (!message || !message.chat || !message.from) return;

    try {
        await handleMessage(bot, message);
    } catch (error) {
        console.error("[Message Handler]", error);
    }
};
