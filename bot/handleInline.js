module.exports = async function handleInline(bot, query) {
    if (!query) return;

    try {
        const event = global.GoatBot.events.get("inline_query");

        if (event && typeof event.onStart === "function") {
            await event.onStart({
                bot,
                api: bot,
                event: query,
                query,
                userID: String(query.from.id)
            });
        }
    } catch (error) {
        console.error("[Inline Handler]", error);
    }
};
