module.exports = function telegramApi(bot) {
    return {
        sendMessage(chatID, text, options = {}) {
            return bot.sendMessage(chatID, text, options);
        },

        sendPhoto(chatID, photo, options = {}) {
            return bot.sendPhoto(chatID, photo, options);
        },

        sendDocument(chatID, document, options = {}) {
            return bot.sendDocument(chatID, document, options);
        },

        sendAudio(chatID, audio, options = {}) {
            return bot.sendAudio(chatID, audio, options);
        },

        sendVideo(chatID, video, options = {}) {
            return bot.sendVideo(chatID, video, options);
        },

        deleteMessage(chatID, messageID) {
            return bot.deleteMessage(chatID, messageID);
        },

        getMe() {
            return bot.getMe();
        }
    };
};
