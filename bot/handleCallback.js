module.exports = async function handleCallback(bot, query) {
    if (!query) return;

    try {
        await bot.answerCallbackQuery(query.id);

        const callback = global.GoatBot.events.get("callback_query");

        if (callback && typeof callback.onStart === "function") {
            await callback.onStart({
                bot,
                api: bot,
                event: query,
                query,
                userID: String(query.from.id)
            });
        }
    } catch (error) {
        console.error("[Callback Handler]", error);
    }
};
