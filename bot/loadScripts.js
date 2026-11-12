const fs = require("fs");
const path = require("path");

module.exports = async function loadScripts(bot) {
    const commandDir = path.join(__dirname, "../scripts/cmds");
    const eventDir = path.join(__dirname, "../scripts/events");

    const commands = global.GoatBot.commands;
    const events = global.GoatBot.events;

    function loadDirectory(dir, collection, type) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`[${type}] Folder created: ${dir}`);
            return;
        }

        for (const file of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, file);

            if (fs.statSync(fullPath).isDirectory()) {
                loadDirectory(fullPath, collection, type);
                continue;
            }

            if (!file.endsWith(".js")) continue;

            try {
                delete require.cache[require.resolve(fullPath)];
                const script = require(fullPath);

                if (!script || typeof script !== "object") continue;

                const name = script.config?.name || script.name;
                if (!name) continue;

                collection.set(name, script);
                console.log(`[${type}] Loaded: ${name}`);
            } catch (error) {
                console.error(`[${type}] ${file}:`, error.message);
            }
        }
    }

    loadDirectory(commandDir, commands, "COMMAND");
    loadDirectory(eventDir, events, "EVENT");

    return { commands, events };
};
